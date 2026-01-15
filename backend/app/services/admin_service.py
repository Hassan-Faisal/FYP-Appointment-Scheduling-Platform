import secrets
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.doctor import DoctorProfile
from app.models.appointment import Appointment
from app.services.email_service import send_email
from app.core.security import hash_password


def create_doctor(db: Session, payload):
    token = secrets.token_urlsafe(32)

    user = User(
        name=payload["full_name"],
        email=payload["email"],
        password_hash=hash_password(payload["password"]),
        role="doctor",
        email_verification_token=token
    )

    db.add(user)
    db.flush()

    doctor = DoctorProfile(
        user_id=user.id,
        full_name=payload["full_name"],
        specialization=payload["specialization"],
        experience_years=payload["experience_years"],
        consultation_fee=payload["consultation_fee"]
    )

    db.add(doctor)
    db.commit()

    send_email(
        user.email,
        "Verify Your Doctor Account",
        f"Verification Token: {token}"
    )

    return {"message": "Doctor created & verification email sent"}

def toggle_user(db: Session, user_id: str, active: bool):
    user = db.query(User).get(user_id)
    user.is_active = active
    db.commit()


def admin_stats(db: Session):
    return {
        "patients": db.query(User).filter(User.role == "patient").count(),
        "doctors": db.query(User).filter(User.role == "doctor").count(),
        "appointments": db.query(Appointment).count(),
        "cancelled": db.query(Appointment).filter(Appointment.status == "cancelled").count(),
        "missed": db.query(Appointment).filter(Appointment.status == "no_show").count(),
    }

def reschedule(db: Session, appointment_id, payload):
    appt = db.query(Appointment).get(appointment_id)
    appt.appointment_date = payload["date"]
    appt.start_time = payload["start_time"]
    appt.end_time = payload["end_time"]
    appt.status = "booked"
    db.commit()
