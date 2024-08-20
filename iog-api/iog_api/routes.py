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
            "equal_to",
            "not_equal_to"
            "greater_than",
            "greater_than_or_equal_to",
            "less_than",
            "less_than_or_equal_to",
            "isin",
            "notin",
            "str_contains",
            "str_endswith",
            # "string length" takes two args,
            "str_startswith",
            "str_matches",
            "unique_values_eq"
            ]
