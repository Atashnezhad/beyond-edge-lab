from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.user import User, UserCreate, Token
from ..services.auth import AuthService, ACCESS_TOKEN_EXPIRE_MINUTES
from ..database.postgres import PostgresDatabase

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Initialize database and auth service
database = PostgresDatabase("postgresql+asyncpg://user:password@localhost/dbname")
auth_service = AuthService(database)

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    """Register a new user"""
    return await auth_service.create_user(
        email=user.email,
        password=user.password,
        full_name=user.full_name
    )

@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login and get access token"""
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    """Get current user information"""
    return await auth_service.get_current_user(token) 