import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://dessert-project-nine.vercel.app/api/products";
const LOGOUT_URL = "http://localhost:5000/api/auth/logout";

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

  // Styles
  const containerStyle = {
    maxWidth: "700px", margin: "40px auto", padding: "20px",
    backgroundColor: "#f8f8f8", borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    width: "100%", padding: "10px", marginBottom: "10px",
    borderRadius: "5px", border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px 20px", backgroundColor: "#28a745",
    color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer",
    marginRight: "10px"
  };

  const productCardStyle = {
    border: "1px solid #ccc", padding: "15px", marginBottom: "15px",
    borderRadius: "8px", backgroundColor: "#fff"
  };

  const imageStyle = {
    maxWidth: "100%", height: "200px", objectFit: "cover",
    borderRadius: "5px", marginBottom: "10px"
  };

  const modalStyle = {
    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    backgroundColor: "#fff", padding: "30px", borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)", zIndex: 1000
  };

  const overlayStyle = {
    position: "fixed", top: 0, left: 0, height: "100vh", width: "100vw",
    backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999
  };

  const successPopupStyle = {
    position: "fixed", top: "20px", right: "20px", backgroundColor: "#28a745",
    color: "#fff", padding: "10px 20px", borderRadius: "5px", zIndex: 1001
  };

  return (
    <div style={containerStyle}>
      <h2>Admin Product Dashboard</h2>
      {showSuccessPopup && <div style={successPopupStyle}> Product updated successfully!</div>}
      <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} style={inputStyle} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} style={inputStyle}/>
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={inputStyle} />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} style={inputStyle} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={inputStyle} />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={inputStyle} />
      <button onClick={handleCreate} style={buttonStyle}>Add Product</button>
      <hr />

      {products.map((p) => (
        <div key={p._id} style={productCardStyle}>
          {p.image || p.images ? <img src={p.image || p.images} alt={p.name} style={imageStyle} /> : null}
          <h4>{p.name} - ₹{p.price}</h4>
          <p><strong>Quantity:</strong> {p.quantity}</p>
          <p>{p.description}</p>
          <button onClick={() => openUpdateModal(p)} style={buttonStyle}>Update</button>
          <button onClick={() => handleDelete(p._id)} style={{ ...buttonStyle, backgroundColor: "#dc3545" }}>Delete</button>
        </div>
      ))}

      {isModalOpen && (
        <>
          <div style={overlayStyle} onClick={() => setIsModalOpen(false)} />
          <div style={modalStyle}>
            <h3>Edit Product</h3>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            <input name="category" value={form.category} onChange={handleChange} style={inputStyle}/>
            <input name="price" value={form.price} onChange={handleChange} style={inputStyle} />
            <input name="quantity" value={form.quantity} onChange={handleChange} style={inputStyle} />
            <input name="description" value={form.description} onChange={handleChange} style={inputStyle} />
            <input name="image" value={form.image} onChange={handleChange} style={inputStyle} />
            <button onClick={handleModalUpdate} style={buttonStyle}>Submit Update</button>
            <button onClick={() => setIsModalOpen(false)} style={{ ...buttonStyle, backgroundColor: "#6c757d" }}>Cancel</button>
          </div>
        </>
      )}

      <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: "#007bff", marginTop: "20px", width: "100%" }}>
         Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
