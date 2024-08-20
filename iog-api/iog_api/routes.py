from typing import List
from io import BytesIO

import pandas as pd
import pandera as pa
from fastapi import APIRouter, UploadFile, File, HTTPException, status

from services import schema_service, validation_service

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

@router.get("/datatypes", response_model=List[str])
async def get_data_types():
    return data_types


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


@router.post("/schemas/validate", status_code=status.HTTP_202_ACCEPTED)
async def validate_schema(file: UploadFile = File(...), schema_name: str = '') -> None:
    """
    Accepts a file to be validated and the name of a Pandera DataFrameSchema to validate against.
    Returns 202 NO CONTENT if validation passes, else 400 BAD REQUEST with a detailed error message.
    """
    # Ensure the schema name is provided
    if not schema_name:
        raise HTTPException(status_code=400, detail="Schema name must be provided.")

    # Ensure the schema exists
    try:
        schema = schema_service.get_schema(schema_name)
        if schema is None:
            raise HTTPException(status_code=400, detail="Schema not found.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving schema: {e}")

    try:
        # Read the uploaded file into a DataFrame
        contents = await file.read()
        df = pd.read_csv(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {e}")

    # Validate the DataFrame against the schema
    try:
        schema.validate(df)
        return None  # Return 202 NO CONTENT on successful validation
    except pa.errors.SchemaError as e:
        error_details = {"error": "Schema validation failed", "details": str(e)}
        raise HTTPException(status_code=400, detail=error_details)
    except Exception as e:
        error_details = {"error": "Unexpected validation error", "details": str(e)}
        raise HTTPException(status_code=400, detail=error_details)
