// frontend/src/Components/CategoryProducts/CategoryProducts.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dessert-project-nine.vercel.app/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to the cart 🛒`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id} style={{ width: '250px', border: '1px solid #ddd', borderRadius: '10px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img
              src={product.image || 'https://via.placeholder.com/250'}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button className="btn btn-success mt-2" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            <button className="btn btn-outline-primary mt-2 ms-2" onClick={() => navigate(`/detail/${product._id}`)}>
              Buy Now
            </button>
          </div>
        ))
      ) : (
        <p>No products found for category: {categoryName}</p>
      )}
    </div>
  );
};

export default CategoryProducts;
