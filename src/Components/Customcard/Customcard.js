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
    fetch('https://blissfullbites-mern-backend.onrender.com/api/products')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
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

  if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <>
      <style>
        {`
          .product-container {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }

          .product-card {
            flex: 1 1 250px;
            max-width: 300px;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            text-align: center;
          }

          .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
          }

          .button-group {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          @media (max-width: 768px) {
            .product-card {
              flex: 1 1 100%;
              max-width: 100%;
            }
          }
        `}
      </style>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image || 'https://via.placeholder.com/250'}
              alt={product.name}
              className="product-image"
            />
            <h6>{product.name}</h6>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="button-group">
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/detail/${product._id}`)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Customcard;
