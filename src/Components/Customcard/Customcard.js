import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { toast } from 'react-toastify';

const Customcard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dessert-project-nine.vercel.app/api/products')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to the cart 🛒`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{textAlign:'center'}}>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {filteredProducts.map((product) => (
        <div key={product._id} style={{ width: '250px', border: '1px solid #ddd', padding: '15px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <img
            src={product.image || 'https://via.placeholder.com/250'}
            alt={product.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
          />
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <button className="btn btn-success mt-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button className="btn btn-outline-primary mt-2 ms-3" onClick={() => navigate(`/detail/${product._id}`)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default Customcard;
