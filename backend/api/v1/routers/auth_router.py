from typing import Annotated
from fastapi import APIRouter, Depends

from backend.api.v1.dependencies import get_auth_service
from backend.core.dto.auth import AuthUserModel
from backend.core.dto.user import UserModel
from backend.core.services.auth_service import AuthService


router = APIRouter()


@router.post(
    "/register",
    responses={
        400: {
            "description": "Organization not found",
            "content": {
                "application/json": {
                    "example": {"detail": "User already registered"}
                }
            }
        }
    }
)
async def register(
    form: AuthUserModel, 
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
) -> UserModel:
    return await auth_service.register_user(form)


@router.post("/login")
async def login(
    form: AuthUserModel, 
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
) -> UserModel:
    return await auth_service.login_user(form)