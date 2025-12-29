from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    quantity: int


class ProductUpdate(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    quantity: int

# Output 
class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    quantity: int

    class Config:
        orm_mode = True
