import React from "react";
import { Link } from "react-router-dom";


const ThankYouPage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <h1>Thank you for placing your order!</h1>
      <p>Your order will be delivered soon.</p>
      <Link to= '/home'>
      <button className="btn btn-dark">Return home</button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
