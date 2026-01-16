from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.orm import Session, joinedload
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User
from app.core.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("sub")
        
        # Fetch the actual User object from database with relationships eagerly loaded
        user = db.query(User).options(
            joinedload(User.doctor_profile),
            joinedload(User.patient_profile)
        ).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# def require_role(role: str):
#     def checker(user: User = Depends(get_current_user)):
#         if user.role != role:
#             raise HTTPException(status_code=403, detail="Forbidden")
#         return user
#     return checker




def require_role(role: str):
    def checker(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
        user_dict = decode_access_token(token)
        if user_dict["role"] != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized"
            )
        # Fetch the actual User object from database with relationships eagerly loaded
        user_id = user_dict.get("sub")
        user = db.query(User).options(
            joinedload(User.doctor_profile),
            joinedload(User.patient_profile)
        ).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    return checker
