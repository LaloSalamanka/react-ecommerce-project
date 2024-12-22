import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const order = {
      items: cartItems,
      address,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        clearCart();
        navigate("/order-success");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mt-5">
         <br />
      <br />
      <br />
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Address</h4>
          <textarea
            className="form-control"
            rows="5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.title} x {item.quantity}
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Total</strong>
              <strong>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>Place Order</button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Checkout;