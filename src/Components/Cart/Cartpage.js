import React from 'react'; 
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cartpage = () => {
  const { cartItems, increaseQty, decreaseQty, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate('/customerdetails');
  };

  return (
    <div className="container mt-5" style={{ paddingBottom: "120px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "10px",
                    borderRadius: "8px"
                  }}
                />
                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price} x {item.quantity}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => decreaseQty(item._id)}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => increaseQty(item._id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

         {/* Sticky bottom bar */}
<div
  className="bg-light p-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000
  }}
>
  <h4 className="mb-2 mb-md-0">Total: ₹{totalPrice}</h4>
  <div className="d-flex gap-2">
    <button className="btn btn-danger" onClick={clearCart}>
      Clear Cart
    </button>
    <button className="btn btn-success" onClick={handlePayNow}>
      Pay Now
    </button>
  </div>
</div>

        </>
      )}
    </div>
  );
};

export default Cartpage;
