from datetime import datetime, timedelta
from uuid import uuid4
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import InvalidTokenError, decode, encode
from passlib.context import CryptContext

from backend.core.dto.auth import LoginModel, AuthResponseModel, RegisterModel, TokensModel
from backend.core.dto.user import BaseUserModel
from backend.core.repositories.user_repository import UserRepository
from backend.infrastructure.config.config import JWT_CONFIG
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import InvalidLoginData, InvalidToken
from backend.infrastructure.errors.user_errors import UserAlreadyRegistered, UserNotFound


class AuthService:
    def __init__(self, repository: UserRepository):
        self.repository = repository
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def get_user_by_email(self, email: str) -> User | None:
        user = await self.repository.get_by_attributes(
            (self.repository.model.email, email)
        )
        return None if not user else user[0]

    async def hash_password(self, password: str) -> str:
        return self.context.hash(password)

    async def verify_password(
        self, password: str, hashed_password: str
    ) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(self, form: LoginModel) -> User:
        user = await self.get_user_by_email(form.email)
        if not user:
            raise UserNotFound
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData
        return AuthResponseModel(
            user=BaseUserModel.model_validate(user, from_attributes=True),
            tokens=TokensModel(
                access_token=await self.create_access_token(form.email),
                refresh_token=await self.create_refresh_token(form.email)
            )
        )
    
    async def refresh_token(self, token: str) -> AuthResponseModel:
        user = await self.verify_token(token, is_refresh=True)
        return AuthResponseModel(
            user=BaseUserModel.model_validate(user, from_attributes=True),
            tokens=TokensModel(
                access_token=await self.create_access_token(user.email),
                refresh_token=token
            )   
        )

    async def create_access_token(self, email: str) -> str:
        expire = datetime.now() + timedelta(minutes=JWT_CONFIG.JWT_ACCESS_TOKEN_TIME)
        data = {"sub": email, "exp": expire}
        token = encode(data, JWT_CONFIG.JWT_SECRET, algorithm=JWT_CONFIG.JWT_ALGORITHM)
        return token
    
    async def create_refresh_token(self, username: str ):
        expire = datetime.now() + timedelta(days=JWT_CONFIG.JWT_REFRESH_TOKEN_TIME)
        data = {"exp": expire, "sub": username}
        return encode(data, JWT_CONFIG.JWT_SECRET, algorithm=JWT_CONFIG.JWT_ALGORITHM)

    async def verify_token(self, token: HTTPAuthorizationCredentials | str, is_refresh: bool = False) -> BaseUserModel:
        try:
            payload = decode(
                token.encode("utf-8") if is_refresh else token.credentials,
                JWT_CONFIG.JWT_SECRET,
                algorithms=[JWT_CONFIG.JWT_ALGORITHM],
            )
            email = payload.get("sub")
            if email is None:
                raise InvalidToken
            return await self.get_user_by_email(email)
        except (InvalidTokenError, AttributeError) as e:
            raise InvalidToken

    async def register_user(self, form: RegisterModel) -> User:
        user = await self.get_user_by_email(form.email)
        if user:
            raise UserAlreadyRegistered

        form.password = await self.hash_password(form.password)
        new_user = await self.repository.add_item(**form.model_dump())
        return AuthResponseModel(
            user=BaseUserModel.model_validate(new_user, from_attributes=True),
            tokens=TokensModel(
                access_token=await self.create_access_token(form.email),
                refresh_token=await self.create_refresh_token(form.email)
            )
        )