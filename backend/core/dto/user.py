from pydantic import BaseModel


class BaseUserModel(BaseModel):
    username: str
    email: str
    