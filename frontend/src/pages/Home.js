import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get('/products').then(res => {
      if (!mounted) return;
      setProducts(res.data);
      setLoading(false);
    }).catch(err => {
      fetch('https://fakestoreapi.com/products')
        .then(r => r.json())
        .then(data => { if(mounted){ setProducts(data); setLoading(false); } })
        .catch(()=> { if(mounted) setLoading(false); });
    });
    return () => mounted = false;
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the demo shop. Browse products below.</p>

      {loading ? <div>Loading...</div> : (
        <div className="grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
