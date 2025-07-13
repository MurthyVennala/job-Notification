from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# User Models
class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    location: Optional[str] = None
    preferred_job_categories: List[str] = []
    education_level: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: UserRole = UserRole.USER
    is_active: bool = True
    email_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    notification_preferences: Dict[str, bool] = {
        "email_alerts": True,
        "sms_alerts": False,
        "push_notifications": True
    }

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    phone: Optional[str]
    location: Optional[str]
    role: UserRole
    is_active: bool
    email_verified: bool
    created_at: datetime
    preferred_job_categories: List[str]
    education_level: Optional[str]

# Job Models
class JobCategory(str, Enum):
    BANKING = "banking"
    RAILWAY = "railway"
    TEACHING = "teaching"
    ENGINEERING = "engineering"
    POLICE_DEFENCE = "police_defence"
    SSC = "ssc"
    UPSC = "upsc"
    STATE_GOVT = "state_govt"
    CENTRAL_GOVT = "central_govt"
    PSU = "psu"

class JobStatus(str, Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DRAFT = "draft"

class EducationLevel(str, Enum):
    CLASS_10 = "10th"
    CLASS_12 = "12th"
    DIPLOMA = "diploma"
    ITI = "iti"
    GRADUATE = "graduate"
    POST_GRADUATE = "post_graduate"
    BTECH = "btech"
    BCOM = "bcom"
    BSC = "bsc"

class JobBase(BaseModel):
    title: str
    organization: str
    description: str
    category: JobCategory
    location: str
    state: str
    min_education: EducationLevel
    max_age: Optional[int] = None
    min_age: Optional[int] = None
    application_fee: Optional[float] = 0.0
    total_posts: int
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    application_start_date: datetime
    application_end_date: datetime
    exam_date: Optional[datetime] = None
    official_notification_url: Optional[str] = None
    apply_online_url: Optional[str] = None

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: JobStatus = JobStatus.ACTIVE
    views: int = 0
    applications_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str  # Admin user ID

class JobResponse(JobBase):
    id: str
    status: JobStatus
    views: int
    applications_count: int
    created_at: datetime
    updated_at: datetime

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[JobStatus] = None
    application_end_date: Optional[datetime] = None
    exam_date: Optional[datetime] = None

# Search Models
class JobSearchFilters(BaseModel):
    category: Optional[JobCategory] = None
    location: Optional[str] = None
    state: Optional[str] = None
    education_level: Optional[EducationLevel] = None
    status: Optional[JobStatus] = JobStatus.ACTIVE
    salary_min: Optional[float] = None
    search_query: Optional[str] = None
    page: int = 1
    limit: int = 20

# Notification Models
class NotificationType(str, Enum):
    JOB_ALERT = "job_alert"
    APPLICATION_UPDATE = "application_update"
    RESULT_ANNOUNCEMENT = "result_announcement"
    ADMIT_CARD = "admit_card"

class NotificationBase(BaseModel):
    title: str
    message: str
    type: NotificationType
    job_id: Optional[str] = None

class NotificationCreate(NotificationBase):
    user_ids: List[str] = []  # If empty, send to all users

class Notification(NotificationBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Application Models
class ApplicationStatus(str, Enum):
    APPLIED = "applied"
    UNDER_REVIEW = "under_review"
    SHORTLISTED = "shortlisted"
    REJECTED = "rejected"
    SELECTED = "selected"

class JobApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    user_id: str
    status: ApplicationStatus = ApplicationStatus.APPLIED
    applied_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Admit Card Models
class AdmitCard(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    title: str
    exam_date: datetime
    download_url: str
    instructions: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Result Models
class Result(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    title: str
    result_url: str
    announcement_date: datetime
    type: str = "result"  # result, cutoff, merit_list
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Authentication Models
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

# Dashboard Models
class AdminDashboard(BaseModel):
    total_jobs: int
    active_jobs: int
    total_users: int
    total_applications: int
    recent_jobs: List[JobResponse]
    recent_users: List[UserResponse]

class UserDashboard(BaseModel):
    total_applications: int
    saved_jobs: int
    recent_jobs: List[JobResponse]
    notifications: List[Notification]