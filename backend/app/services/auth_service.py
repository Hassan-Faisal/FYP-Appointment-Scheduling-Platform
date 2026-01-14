from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
import secrets

reset_tokens = {}


def create_user(db: Session, name, email, password, role):
    token = secrets.token_urlsafe(32)

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password),
        role=role,
        email_verification_token=token,
        is_email_verified=False,
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email, password):
    """
    Returns a JWT access token string if authentication succeeds.
    Returns None if credentials are invalid or email not verified.
    """
    user = db.query(User).filter(User.email == email).first()

    # Invalid email or password
    if not user or not verify_password(password, user.password_hash):
        return None

    # Email exists but not yet verified
    if not user.is_email_verified:
        return None

    return create_access_token(
        {
            "sub": str(user.id),
            "role": user.role,
        }
    )


def generate_reset_token(email):
    token = secrets.token_urlsafe(32)
    reset_tokens[token] = email
    return token


def reset_password(db, token, new_password):
    email = reset_tokens.get(token)
    user = db.query(User).filter(User.email == email).first()
    user.password_hash = hash_password(new_password)
    db.commit()
