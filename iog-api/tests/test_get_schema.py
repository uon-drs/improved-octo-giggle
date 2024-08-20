import pytest
from sqlalchemy import create_engine

from iog_api.services.schemas import get_schemas
from iog_api.db import  Base, SessionLocal
from iog_api.schemas import Schema

@pytest.fixture(scope="function")
def session():
    engine = create_engine("sqlite:///./test.db")
    db = SessionLocal()
    Base.metadata.create_all(bind=engine)
    return db

def test_should_return_all_if_empty(session):
    schemata = get_schemas(db=session)
    assert len(schemata) >= 2

def test_should_return_test1_if_named(session):
    schemata = get_schemas(db=session, schema_name='test1')
    assert len(schemata) == 1
    assert schemata[0] == Schema(name='test1', schema='{"schema_type": "dataframe", "columns": {"column1": "here is a pretend column"}}')
