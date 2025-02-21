from typing import Annotated, AsyncGenerator
from fastapi import Depends, Request

from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

import backend.core.repositories as repositories
import backend.core.services as services


bearer = HTTPBearer(auto_error=False)


async def get_db_session(request: Request) -> AsyncGenerator[AsyncSession, None]:
    session = await request.app.state.db_connection.get_session()
    try:
        yield session
    finally:
        await session.close()


async def get_auth_service(session=Depends(get_db_session)) -> services.AuthService:
    return services.AuthService(
        repository=repositories.UserRepository(session=session)
    )


async def get_current_user_deps(
    auth_service: Annotated[services.AuthService, Depends(get_auth_service)],
    token: Annotated[HTTPBearer, Depends(bearer)],
) -> None:
    return await auth_service.verify_token(token)
