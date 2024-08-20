import pandas as pd
import pandera as pa

def validate_schema(schema: pa.DataFrameSchema, data: pd.DataFrame):
    try:
        # Attempt to validate the data against the schema
        schema.validate(data, lazy=True)
        return True
    except pa.errors.SchemaError:
        return False
    
    


