from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter(prefix="/products", tags=["products"])

# get all products
@router.get("/", response_model=list[schemas.Product])
def get_all_products(db: Session = Depends(database.get_db)):
    return crud.get_all_products(db)


# get products by id 
@router.get("/{id}", response_model=schemas.Product)
def get_product_by_id(id: int, db: Session = Depends(database.get_db)):
    result = crud.get_product_by_id(db, id)
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result


# create product
@router.post("/", response_model=schemas.Product, status_code=201)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    return crud.create_product(db, product)


# update product
@router.put("/{id}", response_model=schemas.Product)
def update_product(id: int, product_update: schemas.ProductUpdate, db: Session = Depends(database.get_db)):
    return crud.update_product(db, id, product_update)


# delete product
@router.delete("/{id}", status_code=204)
def delete_product(id: int, db: Session = Depends(database.get_db)):
    crud.delete_product(db, id)
    return Response(status_code=204)
