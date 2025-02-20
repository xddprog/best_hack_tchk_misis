from pydantic import BaseModel


class AuthUserModel(BaseModel):
    email: str
    password: str
