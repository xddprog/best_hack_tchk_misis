from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.v1.routers import all_routers
from backend.infrastructure.database.adapters.pg_connection import DatabaseConnection


@asynccontextmanager
async def lifespan(app):
    app.state.db_connection = await DatabaseConnection()()
    yield


app = FastAPI(lifespan=lifespan)


app.include_router(all_routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)