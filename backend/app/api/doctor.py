from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.appointment import Appointment
from app.models.doctor import DoctorProfile

router = APIRouter()

@router.get("/appointments")
def my_appointments(user=Depends(require_role("doctor")), db: Session = Depends(get_db)):
    return db.query(Appointment).filter(Appointment.doctor_id == user["sub"]).all()


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db


@router.get("/doctors_list")
def list_doctors(db: Session = Depends(get_db)):
    return db.query(DoctorProfile).all()
