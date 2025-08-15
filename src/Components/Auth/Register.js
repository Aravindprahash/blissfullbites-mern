import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        role: "user",
      });
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundImage: `url("https://media.istockphoto.com/id/594077390/photo/bakery-ingredients-and-tools.webp?a=1&b=1&s=612x612&w=0&k=20&c=1lqnkp4qy9FspNbIPYVdlmOSyj6KVEQrIgPcBrtIbY8=")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const containerStyle = {
    width: "400px",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  };

  const inputWrapper = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
  };

  const iconStyle = {
    marginRight: "10px",
    fontSize: "18px",
    color: "#555",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "16px",
    width: "100%",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6dbb3f",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const linkStyle = {
    marginTop: "15px",
    display: "block",
    color: "#007bff",
    textDecoration: "none",
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={containerStyle}>
        <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>Register</h2>

        <div style={inputWrapper}>
          <span style={iconStyle}>👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>✉</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputWrapper}>
          <span style={iconStyle}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>Register</button>

        <Link to="/" style={linkStyle}>
          Already have an account? Login here
        </Link>
      </form>
    </div>
  );
};

export default Register;
