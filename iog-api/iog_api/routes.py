from typing import List
from fastapi import APIRouter

router = APIRouter()

@router.get("/dtypes")
async def get_dtypes():
    return ["Some dtypes here"]

@router.get("/checks")
async def get_checks() -> List:
    """
    Sends a list of the supported checks

    Returns
    -------
    List
        A list of pandera's built in checks. We're only using the checks that take a single argument
    """
    return [
            "equal to",
            "not equal to"
            "greater than",
            "greater than or equal to",
            "less than",
            "less than or equal to",
            "is in",
            "is not in",
            "string contains",
            "string ends with",
            # "string length" takes two args,
            "string starts with",
            "string matches",
            "unique values equal"
            ]
