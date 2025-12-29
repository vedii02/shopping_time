from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas
from sqlalchemy.exc import IntegrityError


def get_all_products(db: Session):
    return db.query(models.Product).all()


def get_product_by_id(db: Session, id: int):
    return db.query(models.Product).filter(models.Product.id == id).first()


def create_product(db: Session, product: schemas.ProductCreate):
    data = product.model_dump() if hasattr(product, "model_dump") else product.dict()
    existing = get_product_by_id(db, data["id"])
    if existing:
        raise HTTPException(status_code=400, detail="Product with this ID already exists")
    db_product = models.Product(**data)
    db.add(db_product)
    try:
        db.commit()
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Could not create product — ID already exists or constraint violated")
    db.refresh(db_product)
    return db_product


def update_product(db: Session, id: int, product_update: schemas.ProductUpdate):
    db_product = get_product_by_id(db, id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product_update.model_dump(exclude_unset=True)if hasattr(product_update, "model_dump") else product_update.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, id: int):
    db_product = get_product_by_id(db, id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()






