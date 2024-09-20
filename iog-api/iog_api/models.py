from sqlalchemy import Column, Integer, String

from iog_api.db import Base, engine


class Schemas(Base):
    __tablename__ = "schemas"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    schema = Column(String)


if __name__ == "__main__":
    # Create the database tables
    Base.metadata.create_all(bind=engine)
