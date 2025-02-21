from fastapi import APIRouter, Depends

from backend.api.v1.dependencies import get_current_user_deps
from backend.api.v1.routers.auth_router import router as auth_router


PROTECTED = Depends(get_current_user_deps)
all_routers = APIRouter(prefix="/api/v1")


all_routers.include_router(auth_router, tags=["AUTH"], prefix="/auth")
