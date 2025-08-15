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
    fetch('https://blissfullbites-mern-backend.onrender.com/api/products')
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
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to the cart 🛒`);
  };

  if (loading) return <p className="text-center mt-4">Loading products...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;

  return (
    <>
      <style>
        {`
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
          }
          .product-card {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .product-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .product-card h3 {
            font-size: 1.1rem;
            margin-bottom: 5px;
          }
          .product-card p {
            margin: 2px 0;
            font-size: 0.9rem;
          }
          .product-actions {
            margin-top: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          @media (max-width: 576px) {
            .product-card img {
              height: 180px;
            }
          }
        `}
      </style>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || 'https://via.placeholder.com/250'}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div className="product-actions">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/detail/${product._id}`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">
            No products found for category: {categoryName}
          </p>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
