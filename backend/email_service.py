import os
from typing import List
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
import logging
from models import User, Job, NotificationType

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.api_key = os.getenv("SENDGRID_API_KEY")
        self.from_email = os.getenv("FROM_EMAIL", "noreply@freejobalert.com")
        self.sg = SendGridAPIClient(api_key=self.api_key) if self.api_key else None
        
    async def send_email(self, to_email: str, subject: str, content: str) -> bool:
        """Send email using SendGrid."""
        if not self.sg:
            logger.warning("SendGrid not configured. Email not sent.")
            return False
            
        try:
            message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(to_email),
                subject=subject,
                html_content=Content("text/html", content)
            )
            
            response = self.sg.send(message)
            return response.status_code == 202
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    async def send_welcome_email(self, user: User) -> bool:
        """Send welcome email to new user."""
        subject = "Welcome to FreeJobAlert - Your Gateway to Government Jobs!"
        
        content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Welcome to FreeJobAlert!</h1>
            </div>
            
            <div style="padding: 20px;">
                <h2>Hello {user.full_name},</h2>
                
                <p>Thank you for joining FreeJobAlert, India's leading government job portal!</p>
                
                <p>Here's what you can do with your account:</p>
                <ul>
                    <li>🔔 Get instant job alerts based on your preferences</li>
                    <li>🎯 Apply directly to government job openings</li>
                    <li>📄 Download admit cards and check results</li>
                    <li>📚 Access exam preparation materials</li>
                    <li>📱 Stay updated via WhatsApp and email</li>
                </ul>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Your Account Details:</strong></p>
                    <p>Email: {user.email}</p>
                    <p>Registration Date: {user.created_at.strftime('%B %d, %Y')}</p>
                </div>
                
                <p>Start exploring jobs that match your qualifications and career goals!</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="#" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        Browse Latest Jobs
                    </a>
                </div>
                
                <p>Best regards,<br>The FreeJobAlert Team</p>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                <p>© 2025 FreeJobAlert.com - All rights reserved</p>
                <p>You received this email because you registered on our platform.</p>
            </div>
        </body>
        </html>
        """
        
        return await self.send_email(user.email, subject, content)
    
    async def send_job_alert(self, user: User, jobs: List[Job]) -> bool:
        """Send job alert email to user."""
        if not jobs:
            return False
            
        subject = f"🎯 {len(jobs)} New Job{'s' if len(jobs) > 1 else ''} Matching Your Preferences"
        
        jobs_html = ""
        for job in jobs:
            jobs_html += f"""
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 10px 0;">
                <h3 style="color: #2563eb; margin: 0 0 10px 0;">{job.title}</h3>
                <p style="margin: 5px 0;"><strong>Organization:</strong> {job.organization}</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> {job.location}, {job.state}</p>
                <p style="margin: 5px 0;"><strong>Category:</strong> {job.category.value.title()}</p>
                <p style="margin: 5px 0;"><strong>Posts:</strong> {job.total_posts}</p>
                <p style="margin: 5px 0;"><strong>Last Date:</strong> {job.application_end_date.strftime('%B %d, %Y')}</p>
                
                <div style="margin-top: 15px;">
                    <a href="#" style="background: #2563eb; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; margin-right: 10px;">
                        View Details
                    </a>
                    <a href="#" style="background: #059669; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px;">
                        Apply Now
                    </a>
                </div>
            </div>
            """
        
        content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Job Alerts!</h1>
            </div>
            
            <div style="padding: 20px;">
                <h2>Hello {user.full_name},</h2>
                
                <p>We found {len(jobs)} new job{'s' if len(jobs) > 1 else ''} that match your preferences:</p>
                
                {jobs_html}
                
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>💡 Pro Tip:</strong> Apply early for better chances of selection!</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="#" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        View All Jobs
                    </a>
                </div>
                
                <p>Best regards,<br>The FreeJobAlert Team</p>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                <p>© 2025 FreeJobAlert.com - All rights reserved</p>
                <p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Update Preferences</a></p>
            </div>
        </body>
        </html>
        """
        
        return await self.send_email(user.email, subject, content)
    
    async def send_application_confirmation(self, user: User, job: Job) -> bool:
        """Send application confirmation email."""
        subject = f"Application Confirmed - {job.title}"
        
        content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #047857); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">✅ Application Confirmed</h1>
            </div>
            
            <div style="padding: 20px;">
                <h2>Hello {user.full_name},</h2>
                
                <p>Your application has been successfully submitted!</p>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; color: #2563eb;">{job.title}</h3>
                    <p style="margin: 5px 0;"><strong>Organization:</strong> {job.organization}</p>
                    <p style="margin: 5px 0;"><strong>Location:</strong> {job.location}, {job.state}</p>
                    <p style="margin: 5px 0;"><strong>Application Date:</strong> {datetime.utcnow().strftime('%B %d, %Y')}</p>
                </div>
                
                <p><strong>What's Next?</strong></p>
                <ul>
                    <li>Keep checking for admit card updates</li>
                    <li>Prepare for the examination</li>
                    <li>Watch for result announcements</li>
                </ul>
                
                <p>We'll notify you about any updates regarding this position.</p>
                
                <p>Best regards,<br>The FreeJobAlert Team</p>
            </div>
        </body>
        </html>
        """
        
        return await self.send_email(user.email, subject, content)

# Global email service instance
email_service = EmailService()