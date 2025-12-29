import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../state/cart';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get(`/products/${id}`).then(res => {
      if (!mounted) return;
      setProduct(res.data);
      setLoading(false);
    }).catch(err => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(r => r.json())
        .then(data => { if(mounted){ setProduct(data); setLoading(false); }})
        .catch(()=> { if(mounted) setLoading(false); });
    });
    return () => mounted = false;
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  function onBuyNow() {
    addToCart(product, qty);
    navigate('/cart');
  }

  return (
    <div>
      <h1>Product</h1>
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div style={{flex:1}}>
          <h2>{product.title}</h2>
          <p style={{fontSize:18, fontWeight:700}}>₹{product.price}</p>
          <p style={{color:'#444'}}>{product.description}</p>

          <div style={{marginTop:12, display:'flex', gap:10, alignItems:'center'}}>
            <label>Qty:</label>
            <input className="input-number" type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value || 1))} />
            <button className="btn btn-primary" onClick={() => addToCart(product, qty)}>Add to cart</button>
            <button className="btn" onClick={onBuyNow}>Buy now</button>
            <button className="btn" onClick={() => addToWishlist(product)}>Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
