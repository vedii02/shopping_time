import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/cart';

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const cartCount = cart.reduce((s, p) => s + (p.qty || 1), 0);
  const wishCount = wishlist.length;

  return (
    <nav className="navbar">
      <div className="app-container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="nav-left">
          <div className="brand"><Link to="/" style={{textDecoration:'none', color:'inherit', }}>StyleOn</Link></div>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-right">
          <Link to="/wishlist" className="row">
            <span className="icon-badge">♡</span>
            <span style={{marginLeft:6}}>Wishlist</span>
            <span style={{marginLeft:6, fontSize:13, color:'#555'}}>({wishCount})</span>
          </Link>

          <Link to="/cart" className="row">
            <span className="icon-badge">🛒</span>
            <span style={{marginLeft:6}}>Cart</span>
            <span style={{marginLeft:6, fontSize:13, color:'#555'}}>({cartCount})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
