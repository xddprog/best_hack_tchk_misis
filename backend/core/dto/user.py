from pydantic import BaseModel


class UserModel(BaseModel):
    emial: str
    