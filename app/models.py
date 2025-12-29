from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=False)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)


   