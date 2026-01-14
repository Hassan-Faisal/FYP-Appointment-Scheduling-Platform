from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.patient import PatientProfile
from app.core.dependencies import get_current_user
from app.models.appointment import Appointment
from app.models.doctor import DoctorProfile
from app.models.user import User


router = APIRouter( tags=["Patient"])


@router.get("/me")
def my_profile(user: User = Depends(require_role("patient")), db: Session = Depends(get_db)):
    profile = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
    if not profile:
        # Return empty profile structure if it doesn't exist yet, but include user's name
        return {
            "name": user.name,  # Name from user account (read-only)
            "full_name": None,
            "phone": None,
            "gender": None,
            "date_of_birth": None,
        }
    # Include user's name in the response
    result = {
        "name": user.name,  # Name from user account (read-only)
        "full_name": profile.full_name,
        "phone": profile.phone,
        "gender": profile.gender,
        "date_of_birth": profile.date_of_birth.isoformat() if profile.date_of_birth else None,
    }
    return result

@router.put("/me")
def update_my_profile(
    payload: dict,
    db: Session = Depends(get_db),
    user: User = Depends(require_role("patient"))
):
    from datetime import datetime
    
    profile = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
    
    # Parse date_of_birth if provided
    date_of_birth = None
    if payload.get("date_of_birth"):
        try:
            # Parse YYYY-MM-DD format
            date_of_birth = datetime.strptime(payload.get("date_of_birth"), "%Y-%m-%d").date()
        except (ValueError, TypeError):
            # If parsing fails, set to None
            date_of_birth = None
    
    if not profile:
        # Create new profile if it doesn't exist
        profile = PatientProfile(
            user_id=user.id,
            full_name=payload.get("full_name"),
            phone=payload.get("phone"),
            gender=payload.get("gender"),
            date_of_birth=date_of_birth
        )
        db.add(profile)
    else:
        # Update existing profile
        profile.full_name = payload.get("full_name")
        profile.phone = payload.get("phone")
        profile.gender = payload.get("gender")
        profile.date_of_birth = date_of_birth

    db.commit()
    db.refresh(profile)

    # Return profile with user's name included
    return {
        "name": user.name,  # Name from user account (read-only)
        "full_name": profile.full_name,
        "phone": profile.phone,
        "gender": profile.gender,
        "date_of_birth": profile.date_of_birth.isoformat() if profile.date_of_birth else None,
    }


@router.get("/stats")
def patient_stats(
    db: Session = Depends(get_db),
    user: User = Depends(require_role("patient"))
):
    # Ensure user is a User object, not a dict
    if not isinstance(user, User):
        raise HTTPException(status_code=500, detail="Invalid user object")
    
    # Get patient profile for the user
    patient_profile = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
    
    if not patient_profile:
        # Return empty stats if profile doesn't exist yet
        return {
            "upcoming": 0,
            "completed": 0,
            "cancelled": 0,
            "no_show": 0,
        }
    
    patient_id = patient_profile.id

    def count(status):
        return db.query(Appointment).filter(
            Appointment.patient_id == patient_id,
            Appointment.status == status
        ).count()

    return {
        "upcoming": count("booked"),
        "completed": count("completed"),
        "cancelled": count("cancelled"),
        "no_show": count("no_show"),
    }



# @router.get("/doctors")
# def list_doctors(db: Session = Depends(get_db)):
#     return db.query(DoctorProfile).all()
