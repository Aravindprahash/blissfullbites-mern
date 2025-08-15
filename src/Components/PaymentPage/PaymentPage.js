import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import codLogo from "../../assets/cod.jpg";
import upiLogo from "../../assets/UPI.png";
import cardLogo from "../../assets/card.jpg";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [maintenanceMsg, setMaintenanceMsg] = useState("");

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", logo: codLogo, available: true },
    { id: "upi", name: "UPI Payment", logo: upiLogo, available: false },
    { id: "card", name: "Credit/Debit Card", logo: cardLogo, available: false },
  ];

  const handleSelect = (method) => {
    setSelectedMethod(method.id);
    if (!method.available) {
      setMaintenanceMsg("Payment mode under maintenance");
    } else {
      setMaintenanceMsg("");
    }
  };

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    const chosen = paymentMethods.find((m) => m.id === selectedMethod);

    if (!chosen.available) {
      return;
    }

    clearCart();
    
    navigate("/thankyoupage");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Choose Your Payment Method</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            style={{
              flex: "1 1 calc(33.333% - 20px)",
              minWidth: "200px",
              cursor: "pointer",
              opacity: method.available ? 1 : 0.7,
              border:
                selectedMethod === method.id
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
              transform:
                selectedMethod === method.id ? "scale(1.05)" : "scale(1)",
              boxShadow:
                selectedMethod === method.id
                  ? "0px 4px 12px rgba(0,0,0,0.2)"
                  : "none",
            }}
            onClick={() => handleSelect(method)}
          >
            <img
              src={method.logo}
              alt={method.name}
              style={{ width: "50px", height: "50px", marginBottom: "10px" }}
            />
            <h5>{method.name}</h5>
            {!method.available && (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>

      {maintenanceMsg && (
        <div
          style={{
            marginTop: "10px",
            color: "red",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {maintenanceMsg}
        </div>
      )}

      <button
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onClick={handleConfirm}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        disabled={!!maintenanceMsg && selectedMethod !== "cod"}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default PaymentPage;
