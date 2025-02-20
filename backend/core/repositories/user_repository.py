from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.user import User


class UserRepository(SqlAlchemyRepository):
    model = User