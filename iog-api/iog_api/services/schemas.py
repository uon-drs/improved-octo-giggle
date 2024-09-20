import json
from typing import Optional, List
from sqlalchemy import insert
from sqlalchemy.orm import Session
from ..models import Schemas
from ..schemas import Schema

def get_schemas(db: Session, schema_name: Optional[str]=None) -> List[Schema]:
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
    if schema_name is None:
        # get all the schemata from the database
        return [Schema(name=res.name, schema=res.schema) for res in db.query(Schemas).all()]
    else:
        return [Schema(name=res.name, schema=res.schema) for res in db.query(Schemas).filter(Schemas.name == schema_name).all()]


def save_schema(db: Session, schema: Schema):
    """Save a new schema to the database.

    Args:
        db (Session): The session connected to the database.
        schema (Schema): The Schema to add to the database.
    """
    schema_str = json.dumps(schema.schema)
    stmnt = insert(Schemas).values(name=schema.name, schema=schema_str)
    db.execute(stmnt)
    db.commit()
