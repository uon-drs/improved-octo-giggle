from pydantic import BaseModel, Json

class Schema(BaseModel):
    """
    A wrapper for the schemata from the database
    """
    name: str
    schema: Json


