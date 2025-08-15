import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.location) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Customer Details:", formData);

    navigate("/paymentpage");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Customer Details</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Location</label>
          <textarea
            name="location"
            className="form-control"
            placeholder="Enter your delivery address"
            rows="3"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CustomerDetails;
