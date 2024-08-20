from fastapi import APIRouter

router = APIRouter()

@router.get("/dtypes")
async def get_dtypes():
    return ["Some dtypes here"]
