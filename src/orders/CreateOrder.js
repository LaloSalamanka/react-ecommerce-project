import React, { useState } from 'react';
import { createOrder } from './services/OrderService';

const CreateOrder = ({ userId }) => {
  const [orderData, setOrderData] = useState({
    totalAmount: 0,
    orderItemList: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createOrder(userId, orderData);
      setSuccess(`Order created with ID: ${data.orderId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        {/* 這裡可以添加表單字段來輸入 orderData */}
        <button type="submit">Create Order</button>
      </form>
      {error && <div>Error: {error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};

export default CreateOrder;