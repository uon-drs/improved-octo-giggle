from typing import Optional, List
from sqlalchemy.orm import Session
from pydantic import BaseModel, Json
from ..models import Schemas

class Schema(BaseModel):
    """
    A wrapper for the schemata from the database
    """
    name: str
    schema: Json

def get_schemas(db: Session, schema_name: Optional[str]) -> List[Schema]:
    """
    Retrieves schemata from the database

    Parameters
    ----------
    db: Session
        The SQLAlchemy Session to run queries in
    schema_name: Optional[str]
        The schema name to search for in the table. If None, then returns all
    
    Returns
    -------
    List[Schema]
        A list of Schema objects
    """
    if schema_name is not None:
        # get all the schemata from the database
        return [Schema(name=res.name, schema=res.schema) for res in db.query(Schemas).all()]
    else:
        return [Schema(name=res.name, schema=res.schema) for res in db.query(Schemas).filter(Schemas.name == schema_name).all()]
