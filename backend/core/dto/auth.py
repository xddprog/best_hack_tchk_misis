from pydantic import BaseModel, EmailStr

from backend.core.dto.user import BaseUserModel


class LoginModel(BaseModel):
    email: EmailStr
    password: str


class RegisterModel(BaseModel):
    email: EmailStr
    password: str
    username: str


class TokensModel(BaseModel):
    access_token: str
    refresh_token: str


class AuthResponseModel(BaseModel):
    user: BaseUserModel
    tokens: TokensModel


class RefreshTokenRequest(BaseModel):
    refresh_token: str