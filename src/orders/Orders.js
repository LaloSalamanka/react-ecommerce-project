import React, { useEffect, useState } from 'react';
import { getOrders } from './services/OrderService';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(userId);
        setOrders(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            Order ID: {order.orderId}, Total Amount: {order.totalAmount}, Created Date: {order.createdDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;