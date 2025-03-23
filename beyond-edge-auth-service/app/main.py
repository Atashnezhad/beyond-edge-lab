from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth

app = FastAPI(
    title="Beyond Edge Auth Service",
    description="Authentication service for Beyond Edge application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to Beyond Edge Auth Service"} 