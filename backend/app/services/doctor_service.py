from datetime import date
from sqlalchemy.orm import Session
from app.models.appointment import Appointment

def doctor_dashboard_stats(db: Session, doctor_id):
    today = date.today()

    return {
        "today_appointments": db.query(Appointment).filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date == today
        ).count(),

        "completed": db.query(Appointment).filter(
            Appointment.doctor_id == doctor_id,
            Appointment.status == "completed"
        ).count(),

        "missed": db.query(Appointment).filter(
            Appointment.doctor_id == doctor_id,
            Appointment.status == "no_show"
        ).count(),

        "upcoming": db.query(Appointment).filter(
            Appointment.doctor_id == doctor_id,
            Appointment.status == "booked"
        ).count(),
    }
