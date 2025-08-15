import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundImage: `url('https://media.istockphoto.com/id/623710276/photo/picture-frame-and-cake-cookies-cakepops-cupcakes-copy-space.jpg?s=612x612&w=0&k=20&c=PYpo64-sn5OBxkQWSEuXXdofXIW0Y0-wx-JDCa1d4qU=')`,
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "10px 12px 25px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  };

  const logoStyle = {
    width: "100px",
    height: "100px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "10px 20px 10px rgba(0,0,0,0.3)",
  };

  const inputStyle = (icon) => ({
    width: "100%",
    padding: "12px 12px 12px 40px",
    margin: "12px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundImage: `url('${icon}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center",
    backgroundSize: "20px",
  });

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
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
        <img
          src="https://r2.erweima.ai/imgcompressed/img/compressed_f316709519a166bf920bd88c8cc2dfae.webp"
          alt="login avatar"
          style={logoStyle}
        />
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle("https://cdn-icons-png.flaticon.com/512/1077/1077114.png")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle("https://cdn-icons-png.flaticon.com/512/3064/3064155.png")}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <Link to="/register" style={linkStyle}>
          Don't have an account? Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;
