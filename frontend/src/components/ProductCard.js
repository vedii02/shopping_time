import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/cart';

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const wished = wishlist.some(p => p.id === product.id);

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} style={{textDecoration:'none', color:'inherit'}}>
        <img src={product.image} alt={product.title} />
      </Link>

      <div style={{fontSize:14, fontWeight:600}}>{product.title}</div>
      <div style={{color:'#444'}}>₹{product.price}</div>

      <div style={{display:'flex', gap:8, marginTop:6}}>
        <button className="btn small" onClick={() => addToCart(product)}>Add to cart</button>
        <button className="btn small" onClick={() => addToWishlist(product)} disabled={wished}>
          {wished ? 'In wishlist' : 'Wishlist'}
        </button>
        <Link to={`/product/${product.id}`} className="btn small btn-ghost" style={{textDecoration:'none'}}>Details</Link>
      </div>
    </div>
  );
}
