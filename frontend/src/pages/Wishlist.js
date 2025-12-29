import React from 'react';
import { useCart } from '../state/cart';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return <div className="empty"><h3>Your wishlist is empty</h3></div>;
  }

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="grid">
        {wishlist.map(item => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <div style={{fontWeight:600}}>{item.title}</div>
            <div>₹{item.price}</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={() => addToCart(item)}>Add to cart</button>
              <button className="btn" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
