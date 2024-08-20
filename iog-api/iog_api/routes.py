from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from iog_api.db import get_db
from iog_api.services.schemas import Schema, get_schemas

router = APIRouter()


data_types = [
    "bool",
    "datetime64[ns]",
    "timedelta64[ns]",
    "category",
    "float16",
    "float32",
    "float64",
    "float128",
    "int8",
    "int16",
    "int32",
    "int64",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "complex64",
    "complex128",
    "complex256",
    "decimal",
    "string"
]

numeric_checks = [
        "equal_to",
        "not_equal_to"
        "greater_than",
        "greater_than_or_equal_to",
        "less_than",
        "less_than_or_equal_to",
        "isin",
        "notin",
]

string_checks = [
        "isin",
        "notin",
        "str_contains",
        "str_endswith",
        # "string length" takes two args,
        "str_startswith",
        "str_matches",
        "unique_values_eq"
        ]

checks = {
        "bool": ["equal_to", "not_equal_to"],
        "datetime64[ns]": numeric_checks,
        "timedelta64[ns]": numeric_checks,
        "category": ["equal_to", "not_equal_to"],
        "float16": numeric_checks,
        "float32": numeric_checks,
        "float64": numeric_checks,
        "float128": numeric_checks,
        "int8": numeric_checks,
        "int16": numeric_checks,
        "int32": numeric_checks,
        "int64": numeric_checks,
        "uint8": numeric_checks,
        "uint16": numeric_checks,
        "uint32": numeric_checks,
        "uint64": numeric_checks,
        "complex64": numeric_checks,
        "complex128": numeric_checks,
        "complex256": numeric_checks,
        "decimal": numeric_checks,
        "string": numeric_checks,
    }


@router.get("/datatypes", response_model=List[str])
async def get_data_types():
    return data_types


@router.get("/checks")
async def get_checks(dtype: Optional[str]=None) -> List:
    """
    Sends a list of the supported checks

    Returns
    -------
    List
        A list of pandera's built in checks. We're only using the checks that take a single argument
    """
    if dtype is not None:
        return checks[dtype]
    else:
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

@router.get("/schemas")
async def get_schemata(schema_name: str, db: Session = Depends(get_db)) -> List[Schema]:
    return get_schemas(db=db, schema_name=schema_name)
