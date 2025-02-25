import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from backend.infrastructure.config.config import DB_CONFIG
from backend.infrastructure.database.models.base import Base


class DatabaseConnection:
    def __init__(self):
        self._engine = create_async_engine(
            url=DB_CONFIG.get_url(is_async=True)
        )

    async def get_session(self) -> AsyncSession:
        return AsyncSession(bind=self._engine)
        
    async def __call__(self):
        async with self._engine.begin() as conn:
            # await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
        return self
    