from sqlalchemy.orm import Mapped
from backend.infrastructure.database.models.base import Base


class User(Base):
    __tablename__ = "users"

    email: Mapped[str]
    password: Mapped[str]