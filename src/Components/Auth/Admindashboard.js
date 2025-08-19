import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://blissfullbites-mern-backend.onrender.com/api/products";
const LOGOUT_URL = "https://blissfullbites-mern-backend.onrender.com/api/auth/logout";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "", category: "", price: "", quantity: "", description: "", image: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/");
        } else {
          const timeout = (decoded.exp - currentTime) * 1000;
          const timer = setTimeout(() => {
            alert("Session expired. Please log in again.");
            localStorage.clear();
            navigate("/");
          }, timeout);
          return () => clearTimeout(timer);
        }
      } catch {
        localStorage.clear();
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/");
    }
  }, [navigate, user]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(BASE_URL, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: "", category:"", price: "", quantity: "", description: "", image: "" });
      fetchProducts();
    } catch (error) {
      alert("Create failed.");
      console.error("Create error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
      console.error("Delete error:", error);
    }
  };

  const openUpdateModal = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      image: product.image || product.images || "",
    });
    setEditId(product._id);
    setIsModalOpen(true);
  };

  const handleModalUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsModalOpen(false);
      setEditId(null);
      setForm({ name: "", category: "", price: "", quantity: "", description: "", image: "" });
      fetchProducts();
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (err) {
      alert("Update failed");
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(LOGOUT_URL, { email: user.email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-container">
      <style>{`
        .admin-container {
          max-width: 1200px;
          margin: 30px auto;
          padding: 20px;
        }
        h2{
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .form-container {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .form-container input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-primary { background: #007bff; color: #fff; }
        .btn-success { background: #28a745; color: #fff; }
        .btn-danger { background: #dc3545; color: #fff; }
        .btn-secondary { background: #6c757d; color: #fff; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .product-card {
          background: #fff;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .product-card h4 {
          margin: 10px 0;
          color: #333;
        }
        .modal-overlay {
          position: fixed;
          top:0; left:0; width:100%; height:100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
        }
        .success-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #28a745;
          color: #fff;
          padding: 10px 20px;
          border-radius: 6px;
          z-index: 2000;
        }
        @media(max-width:600px) {
          .product-card img { height: 150px; }
          .btn { width: 100%; margin-top: 5px; }
        }
      `}</style>

      <h2>​𝘼𝙙𝙢𝙞𝙣 𝙋𝙧𝙤𝙙𝙪𝙘𝙩 𝘿𝙖𝙨𝙝𝙗𝙤𝙖𝙧𝙙</h2>
      {showSuccessPopup && <div className="success-popup">Product updated successfully!</div>}

      <div className="form-container">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange}/>
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange}/>
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange}/>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange}/>
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange}/>
        <button onClick={handleCreate} className="btn btn-success">Add Product</button>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.image || p.images ? <img src={p.image || p.images} alt={p.name} /> : null}
            <h4>{p.name} - ₹{p.price}</h4>
            <p><strong>Qty:</strong> {p.quantity}</p>
            <p>{p.description}</p>
            <button onClick={() => openUpdateModal(p)} className="btn btn-primary">Update</button>{" "}
            <button onClick={() => handleDelete(p._id)} className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
            <h3>Edit Product</h3>
            <input name="name" value={form.name} onChange={handleChange}/>
            <input name="category" value={form.category} onChange={handleChange}/>
            <input name="price" value={form.price} onChange={handleChange}/>
            <input name="quantity" value={form.quantity} onChange={handleChange}/>
            <input name="description" value={form.description} onChange={handleChange}/>
            <input name="image" value={form.image} onChange={handleChange}/>
            <button onClick={handleModalUpdate} className="btn btn-success">Submit Update</button>{" "}
            <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <button onClick={handleLogout} className="btn btn-primary" style={{marginTop:"30px", width:"100%"}}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
