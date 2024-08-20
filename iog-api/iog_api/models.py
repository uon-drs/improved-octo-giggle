from sqlalchemy import Column, Integer, String

from db import Base


class Schemas(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    schema = Column(String)
