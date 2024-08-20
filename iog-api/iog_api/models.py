from sqlalchemy import Column, Integer, String

from iog_api.db import Base


class Schemas(Base):
    __tablename__ = 'schemas'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    schema = Column(String)
