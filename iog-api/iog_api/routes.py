from fastapi import APIRouter
from typing import List


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

@router.get("/datatypes/", response_model=List[str])
async def get_data_types():
    return data_types

