import React from 'react';
import { useCart } from '../state/cart';

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((s,p) => s + (p.price || 0) * (p.qty || 1), 0);

  if (cart.length === 0) {
    return <div className="empty"><h3>Your cart is empty</h3></div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="list">
        {cart.map(item => (
          <div key={item.id} style={{display:'flex', gap:12, alignItems:'center', padding:10, background:'#fff', borderRadius:8}}>
            <img src={item.image} alt={item.title} style={{width:90, height:90, objectFit:'contain'}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{item.title}</div>
              <div>₹{item.price}</div>
            </div>
            <div>
              <input className="input-number" type="number" min="1" value={item.qty} onChange={(e)=> updateQty(item.id, Number(e.target.value || 1))} />
            </div>
            <div>
              <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16, fontWeight:700}}>Total: ₹{total.toFixed(2)}</div>
    </div>
  );
}
