import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from 'react-icons/fa'; // 加入圖標


function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-5">
      <br />
      <br />
      <br />
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert  text-center">
          <FaShoppingCart size={50} className="mb-3" />
          <h4>Your Cart is Empty!</h4>
          <p>It looks like you haven’t added anything to your cart yet. Start shopping now!</p>
        </div>
      ) : (
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>
                <img src={item.imageUrl} alt={item.productName} width="50" />
              </td>
              <td>{item.productName}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
      <div className="d-flex justify-content-between">
        <h4>Cart Total: ${calculateTotal()}</h4>
        <button className="btn btn-primary" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Checkout
        </button>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default Cart;