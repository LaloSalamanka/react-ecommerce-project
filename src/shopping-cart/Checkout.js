import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../service/OrderService';
import './Checkout.css'; // 引入 CSS 文件

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems, setCartItems } = useCart();
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    state: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handlePlaceOrder = async () => {
    if (Object.values(shippingAddress).some(field => field === '')) {
      setError('All fields are required.');
      return;
    }

    try {
      const orderData = {
        orderItemList: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const data = await createOrder(user.userId, orderData);
      console.log('Order created:', data);

      // 清空購物車
      setCartItems([]);

      // 導向至訂單確認頁面或其他頁面
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <br/>
      <br/>
      <div className="row">
        <div className="col-md-5 me-5">
          <h2>Shipping Address</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={shippingAddress.name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address Line 1</label>
              <input type="text" className="form-control" name="addressLine1" value={shippingAddress.addressLine1} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address Line 2</label>
              <input type="text" className="form-control" name="addressLine2" value={shippingAddress.addressLine2} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input type="text" className="form-control" name="pincode" value={shippingAddress.pincode} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state" value={shippingAddress.state} onChange={handleInputChange} required />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Order Summary</h2>
          <ul className="list-group mb-3 mt-4">
            <li className="list-group-item d-flex justify-content-between bg-light">
              <span className="fw-bold">Item</span>
              <span className="fw-bold">Quantity</span>
              <span className="fw-bold">Price</span>
              <span className="fw-bold">Total</span>
            </li>
            {cartItems.map(item => (
              <li key={item.productId} className="list-group-item d-flex justify-content-between">
                <span className="item-name">{item.productName}</span>
                <span>{item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <span className="fw-bold">Grand Total:</span>
            <span className="fw-bold">${cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}</span>
          </div>
          <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;