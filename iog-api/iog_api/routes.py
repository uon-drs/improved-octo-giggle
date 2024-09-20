from typing import List, Optional
from io import BytesIO

import pandas as pd
import pandera as pa
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends, Query
from sqlalchemy.orm import Session

from iog_api.db import get_db
from iog_api.services import schemas, validation
from iog_api.schemas import Schema as PydanticSchema

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
    "string",
]

numeric_checks = [
    "equal_to",
    "not_equal_to" "greater_than",
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
    "unique_values_eq",
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
async def get_checks(dtype: Optional[str] = None) -> List:
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
            "not_equal_to" "greater_than",
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
            "unique_values_eq",
        ]


@router.get("/schemas")
async def get_schemata(
    schema_name: str, db: Session = Depends(get_db)
) -> List[PydanticSchema]:
    return schemas.get_schemas(db=db, schema_name=schema_name)


@router.post("/schemas/validate", status_code=status.HTTP_202_ACCEPTED)
async def validate_schema(
    file: UploadFile = File(...),
    schema_name: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
) -> None:
    """
    Accepts a file to be validated and the name of a Pandera DataFrameSchema to validate against.

    Returns
    -------
    None
        Returns a 202 ACCEPTED status code if the file is successfully validated against the schema.
    """
    try:
        available_schemas = schemas.get_schemas(db, schema_name)
        if available_schemas is None:
            raise HTTPException(status_code=400, detail="Schema not found.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error retrieving schema: {e}")

    try:
        # Read the uploaded file into a DataFrame
        contents = await file.read()
        df = pd.read_csv(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {e}")

    # Create the pandera object from the json schema
    try:
        schema_json = available_schemas[0].schema
        schema = pa.DataFrameSchema(schema_json)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating schema: {e}")

    # Validate the DataFrame against the schema
    validation_result = validation.validate_schema(schema, df)

    if validation_result:
        return None  # Return 202 NO CONTENT on successful validation
    else:
        raise HTTPException(status_code=400, detail="Validation failed.")


@router.post("/schemas")
async def create_schema(
    schema: PydanticSchema, db: Session = Depends(get_db)
) -> PydanticSchema:
    try:
        schemas.save_schema(db, schema)
        return schema
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unable to save schema.")
