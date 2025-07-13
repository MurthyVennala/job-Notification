from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Query
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta
import re

# Import custom modules
from models import *
from auth import *
from email_service import email_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Government Job Portal API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database
async def get_database():
    return db

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# =======================
# AUTHENTICATION ROUTES
# =======================

@api_router.post("/auth/register", response_model=UserResponse)
async def register_user(user_data: UserCreate, db: AsyncIOMotorClient = Depends(get_database)):
    """Register a new user."""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    hashed_password = get_password_hash(user_data.password)
    user_dict = user_data.dict()
    del user_dict['password']
    user_dict['hashed_password'] = hashed_password
    
    user = User(**user_dict)
    
    # Save to database
    await db.users.insert_one(user.dict())
    
    # Send welcome email
    try:
        await email_service.send_welcome_email(user)
    except Exception as e:
        logger.error(f"Failed to send welcome email: {str(e)}")
    
    return UserResponse(**user.dict())

@api_router.post("/auth/login", response_model=Token)
async def login_user(user_credentials: UserLogin, db: AsyncIOMotorClient = Depends(get_database)):
    """Login user and return JWT token."""
    user = await authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login
    await db.users.update_one(
        {"email": user.email},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(db: AsyncIOMotorClient = Depends(get_database)):
    """Get current user information."""
    # This would typically use the get_current_user dependency
    # For now, returning a mock response
    return {"message": "User info endpoint"}

# =======================
# JOB MANAGEMENT ROUTES
# =======================

@api_router.get("/jobs", response_model=List[JobResponse])
async def get_jobs(
    category: Optional[JobCategory] = None,
    location: Optional[str] = None,
    state: Optional[str] = None,
    education_level: Optional[EducationLevel] = None,
    search_query: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorClient = Depends(get_database)
):
    """Get jobs with filters and pagination."""
    # Build filter query
    filter_query = {"status": JobStatus.ACTIVE}
    
    if category:
        filter_query["category"] = category
    if location:
        filter_query["location"] = {"$regex": location, "$options": "i"}
    if state:
        filter_query["state"] = {"$regex": state, "$options": "i"}
    if education_level:
        filter_query["min_education"] = education_level
    if search_query:
        filter_query["$or"] = [
            {"title": {"$regex": search_query, "$options": "i"}},
            {"organization": {"$regex": search_query, "$options": "i"}},
            {"description": {"$regex": search_query, "$options": "i"}}
        ]
    
    # Calculate skip and limit
    skip = (page - 1) * limit
    
    # Fetch jobs
    jobs_cursor = db.jobs.find(filter_query).sort("created_at", -1).skip(skip).limit(limit)
    jobs = await jobs_cursor.to_list(length=limit)
    
    return [JobResponse(**job) for job in jobs]

@api_router.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job_by_id(job_id: str, db: AsyncIOMotorClient = Depends(get_database)):
    """Get job by ID."""
    job = await db.jobs.find_one({"id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Increment view count
    await db.jobs.update_one({"id": job_id}, {"$inc": {"views": 1}})
    
    return JobResponse(**job)

@api_router.post("/jobs", response_model=JobResponse)
async def create_job(
    job_data: JobCreate, 
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_admin_user)  # Requires admin access
):
    """Create a new job posting (Admin only)."""
    job_dict = job_data.dict()
    job_dict["created_by"] = "admin"  # current_user.id
    
    job = Job(**job_dict)
    
    # Save to database
    await db.jobs.insert_one(job.dict())
    
    # Send job alerts to subscribed users
    try:
        await send_job_alerts_to_users(db, job)
    except Exception as e:
        logger.error(f"Failed to send job alerts: {str(e)}")
    
    return JobResponse(**job.dict())

@api_router.put("/jobs/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: str,
    job_update: JobUpdate,
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_admin_user)
):
    """Update job posting (Admin only)."""
    job = await db.jobs.find_one({"id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data = {k: v for k, v in job_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.jobs.update_one({"id": job_id}, {"$set": update_data})
    
    updated_job = await db.jobs.find_one({"id": job_id})
    return JobResponse(**updated_job)

@api_router.delete("/jobs/{job_id}")
async def delete_job(
    job_id: str,
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_admin_user)
):
    """Delete job posting (Admin only)."""
    result = await db.jobs.delete_one({"id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {"message": "Job deleted successfully"}

# =======================
# APPLICATION ROUTES
# =======================

@api_router.post("/jobs/{job_id}/apply")
async def apply_for_job(
    job_id: str,
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_current_active_user)
):
    """Apply for a job."""
    # Check if job exists
    job = await db.jobs.find_one({"id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Mock user for now
    user_id = "mock_user_id"
    
    # Check if already applied
    existing_application = await db.applications.find_one({
        "job_id": job_id,
        "user_id": user_id
    })
    if existing_application:
        raise HTTPException(status_code=400, detail="Already applied for this job")
    
    # Create application
    application = JobApplication(job_id=job_id, user_id=user_id)
    await db.applications.insert_one(application.dict())
    
    # Update job applications count
    await db.jobs.update_one({"id": job_id}, {"$inc": {"applications_count": 1}})
    
    # Send confirmation email
    try:
        # Mock user for email
        mock_user = User(email="user@example.com", full_name="User", id=user_id)
        job_obj = Job(**job)
        await email_service.send_application_confirmation(mock_user, job_obj)
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
    
    return {"message": "Application submitted successfully"}

# =======================
# ADMIN ROUTES
# =======================

@api_router.get("/admin/dashboard", response_model=AdminDashboard)
async def get_admin_dashboard(
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_admin_user)
):
    """Get admin dashboard data."""
    # Get counts
    total_jobs = await db.jobs.count_documents({})
    active_jobs = await db.jobs.count_documents({"status": JobStatus.ACTIVE})
    total_users = await db.users.count_documents({})
    total_applications = await db.applications.count_documents({})
    
    # Get recent jobs
    recent_jobs_cursor = db.jobs.find().sort("created_at", -1).limit(5)
    recent_jobs_data = await recent_jobs_cursor.to_list(length=5)
    recent_jobs = [JobResponse(**job) for job in recent_jobs_data]
    
    # Get recent users
    recent_users_cursor = db.users.find().sort("created_at", -1).limit(5)
    recent_users_data = await recent_users_cursor.to_list(length=5)
    recent_users = [UserResponse(**user) for user in recent_users_data]
    
    return AdminDashboard(
        total_jobs=total_jobs,
        active_jobs=active_jobs,
        total_users=total_users,
        total_applications=total_applications,
        recent_jobs=recent_jobs,
        recent_users=recent_users
    )

# =======================
# NOTIFICATION ROUTES
# =======================

@api_router.get("/notifications")
async def get_user_notifications(
    db: AsyncIOMotorClient = Depends(get_database),
    # current_user: User = Depends(get_current_active_user)
):
    """Get user notifications."""
    user_id = "mock_user_id"  # current_user.id
    
    notifications_cursor = db.notifications.find({"user_id": user_id}).sort("created_at", -1).limit(20)
    notifications = await notifications_cursor.to_list(length=20)
    
    return [Notification(**notif) for notif in notifications]

# =======================
# SEARCH ROUTES
# =======================

@api_router.get("/search/jobs")
async def search_jobs(
    q: str = Query(..., description="Search query"),
    category: Optional[JobCategory] = None,
    location: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorClient = Depends(get_database)
):
    """Advanced job search."""
    # Build search query
    search_filter = {
        "status": JobStatus.ACTIVE,
        "$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"organization": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
            {"location": {"$regex": q, "$options": "i"}}
        ]
    }
    
    if category:
        search_filter["category"] = category
    if location:
        search_filter["location"] = {"$regex": location, "$options": "i"}
    
    skip = (page - 1) * limit
    
    jobs_cursor = db.jobs.find(search_filter).sort("created_at", -1).skip(skip).limit(limit)
    jobs = await jobs_cursor.to_list(length=limit)
    
    return [JobResponse(**job) for job in jobs]

# =======================
# UTILITY FUNCTIONS
# =======================

async def send_job_alerts_to_users(db: AsyncIOMotorClient, job: Job):
    """Send job alerts to users based on their preferences."""
    # Find users who might be interested in this job
    filter_query = {
        "notification_preferences.email_alerts": True,
        "$or": [
            {"preferred_job_categories": {"$in": [job.category]}},
            {"preferred_job_categories": {"$size": 0}}  # Users with no preferences get all alerts
        ]
    }
    
    if job.min_education:
        filter_query["education_level"] = job.min_education
    
    users_cursor = db.users.find(filter_query)
    users = await users_cursor.to_list(length=1000)  # Limit to prevent overload
    
    # Send emails
    for user_data in users:
        try:
            user = User(**user_data)
            await email_service.send_job_alert(user, [job])
        except Exception as e:
            logger.error(f"Failed to send job alert to {user_data.get('email')}: {str(e)}")

# =======================
# MOCK DATA ROUTES
# =======================

@api_router.post("/admin/seed-data")
async def seed_mock_data(db: AsyncIOMotorClient = Depends(get_database)):
    """Seed the database with mock data for testing."""
    
    # Create mock jobs
    mock_jobs = [
        {
            "title": "BHEL 515 Artisan Online Form 2025",
            "organization": "Bharat Heavy Electricals Limited",
            "description": "BHEL invites applications for 515 Artisan posts across various disciplines.",
            "category": JobCategory.ENGINEERING,
            "location": "New Delhi",
            "state": "Delhi",
            "min_education": EducationLevel.ITI,
            "total_posts": 515,
            "application_start_date": datetime.now(),
            "application_end_date": datetime.now() + timedelta(days=30),
            "salary_min": 25000,
            "salary_max": 35000,
            "created_by": "admin"
        },
        {
            "title": "Indian Coast Guard Assistant Commandant Online Form 2025",
            "organization": "Indian Coast Guard",
            "description": "Indian Coast Guard recruitment for Assistant Commandant positions.",
            "category": JobCategory.POLICE_DEFENCE,
            "location": "Mumbai",
            "state": "Maharashtra",
            "min_education": EducationLevel.GRADUATE,
            "total_posts": 50,
            "application_start_date": datetime.now(),
            "application_end_date": datetime.now() + timedelta(days=25),
            "salary_min": 56100,
            "salary_max": 177500,
            "created_by": "admin"
        },
        {
            "title": "Bank of Baroda 2500 LBO Online Form 2025",
            "organization": "Bank of Baroda",
            "description": "Bank of Baroda recruitment for 2500 Language Banking Officer posts.",
            "category": JobCategory.BANKING,
            "location": "Vadodara",
            "state": "Gujarat",
            "min_education": EducationLevel.GRADUATE,
            "total_posts": 2500,
            "application_start_date": datetime.now(),
            "application_end_date": datetime.now() + timedelta(days=20),
            "salary_min": 23700,
            "salary_max": 42020,
            "created_by": "admin"
        }
    ]
    
    for job_data in mock_jobs:
        job = Job(**job_data)
        await db.jobs.insert_one(job.dict())
    
    return {"message": f"Seeded {len(mock_jobs)} mock jobs successfully"}

# Include router in app
app.include_router(api_router)

# Basic route
@api_router.get("/")
async def root():
    return {"message": "Government Job Portal API is running!"}

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
