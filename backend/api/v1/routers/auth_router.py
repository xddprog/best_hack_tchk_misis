from typing import Annotated
from fastapi import APIRouter, Body, Depends

from backend.api.v1.dependencies import get_auth_service, get_current_user_deps
from backend.core.dto.auth import AuthResponseModel, LoginModel, RefreshTokenRequest, RegisterModel
from backend.core.dto.user import BaseUserModel
from backend.core.services.auth_service import AuthService


router = APIRouter()


@router.get("/current")
async def get_current_user(
    user: Annotated[BaseUserModel, Depends(get_current_user_deps)]
) -> BaseUserModel:
    return user


@router.post("/register")
async def register(
    form: RegisterModel, 
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
) -> AuthResponseModel:
    return await auth_service.register_user(form)


@router.post("/login")
async def login(
    form: LoginModel, 
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
) -> AuthResponseModel:
    return await auth_service.authenticate_user(form)

@router.post("/refresh")
async def refresh_token(
    refresh_token: RefreshTokenRequest,
    auth_service: Annotated[AuthService, Depends(get_auth_service)]
) -> AuthResponseModel:
    return await auth_service.refresh_token(refresh_token.refresh_token)