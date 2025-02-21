from uuid import uuid4
from environs import Env
from pydantic import BaseModel


env = Env()
env.read_env()


class JwtConfig(BaseModel):
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TIME: int
    JWT_REFRESH_TOKEN_TIME: int



class DatabaseConfig(BaseModel):
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str

    def get_url(self, is_async: bool = True):
        if is_async:
            return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        return f"postgresql://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


DB_CONFIG = DatabaseConfig(
    **{field: env.str(field.upper()) for field in DatabaseConfig.model_fields}
)
JWT_CONFIG = JwtConfig(
    **{field: env.str(field.upper()) for field in JwtConfig.model_fields}
)
