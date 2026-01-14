from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.appointment import Appointment
from app.models.patient import PatientProfile
from app.models.user import User

router = APIRouter()

@router.get("/my-upcoming")
def my_upcoming(db: Session = Depends(get_db), user: User = Depends(require_role("patient"))):
    # Get patient profile for the user
    patient_profile = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
    
    if not patient_profile:
        return []
    
    return db.query(Appointment).filter(
        Appointment.patient_id == patient_profile.id,
        Appointment.appointment_date >= date.today()
    ).all()

@router.get("/my-history")
def my_history(db: Session = Depends(get_db), user: User = Depends(require_role("patient"))):
    # Get patient profile for the user
    patient_profile = db.query(PatientProfile).filter(PatientProfile.user_id == user.id).first()
    
    if not patient_profile:
        return []
    
    return db.query(Appointment).filter(
        Appointment.patient_id == patient_profile.id,
        Appointment.appointment_date < date.today()
    ).all()
