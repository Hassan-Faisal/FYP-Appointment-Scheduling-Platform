from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.breaks import DoctorBreak

router = APIRouter()

# @router.post("/break")
# def add_break(
#     doctor_id: str,
#     break_start: str,
#     break_end: str,
#     db: Session = Depends(get_db),
#     user=Depends(require_role("admin"))
# ):
#     record = DoctorBreak(
#         doctor_id=doctor_id,
#         break_start=break_start,
#         break_end=break_end
#     )
#     db.add(record)
#     db.commit()
#     return {"message": "Break added"}

@router.post("/break", dependencies=[Depends(require_role("admin"))])
def add_break(payload: dict, db: Session = Depends(get_db)):
    return create_break(db, payload)
