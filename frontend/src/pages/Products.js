import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get('/products').then(res => {
      if (!mounted) return;
      setProducts(res.data);
      setLoading(false);
    }).catch(err => {
      //https://fakestoreapi.com/products
      fetch('postgresql://postgres:vedi1234@localhost:4000/E-commerce_website')
        .then(r => r.json())
        .then(data => { if(mounted){ setProducts(data); setLoading(false); }})
        .catch(()=> { if(mounted) setLoading(false); });
    });

    return () => mounted = false;
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {loading ? <div>Loading products...</div> : (
        <div className="grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
