from fastapi import APIRouter, Depends

from backend.api.v1.dependencies import check_token
from backend.api.v1.routers.auth_router import router as auth_router


PROTECTED = Depends(check_token)
access_denied = {
    403: {
        "content": {
            "application/json": {
                "example": {"detail": "Access denied"}
            }
        }
    }
}
all_routers = APIRouter(prefix="/api/v1")


all_routers.include_router(auth_router, tags=["AUTH"], prefix="/auth")
# all_routers.include_router(
#     organization_router, 
#     tags=["ORGANIZATION"], 
#     prefix="/organization", 
#     dependencies=[PROTECTED],
#     responses=access_denied
# )
