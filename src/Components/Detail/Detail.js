import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dessert-project-nine.vercel.app/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to the cart 🛒`);
    navigate('/cartpage');
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container py-5">
      <div className="row align-items-center py-3">
        <div className="col-md-6 mb-3 mb-md-0">
          <img
            src={product.image || 'https://via.placeholder.com/600x300'}
            alt={product.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </div>

        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>Category : {product.category}</p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p>
            <b>{product.description}</b>
          </p>
          <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
