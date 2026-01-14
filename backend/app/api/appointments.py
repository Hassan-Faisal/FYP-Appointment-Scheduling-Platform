from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.appointment import Appointment
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.get("/my")
def get_my_appointments(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Appointment)\
        .filter(Appointment.patient_id == user.id)\
        .order_by(Appointment.date.desc())\
        .all()


@router.post("/{appointment_id}/cancel")
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.patient_id == user.id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment.status = "cancelled"
    db.commit()
    return {"message": "Appointment cancelled"}
