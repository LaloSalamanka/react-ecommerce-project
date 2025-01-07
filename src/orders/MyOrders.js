import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOrders } from '../services/OrderService';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.userId) {
        try {
          const data = await getOrders(user.userId);
          setOrders(data.results);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (!user || !user.userId) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <br/>
      <br/>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center mt-4" role="alert">
          <h4>No Orders Found</h4>
          <p>You currently have no orders. Start shopping to create your first order!</p>
        </div>
      ) :(
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Ordered On</th>
            <th scope="col">Order Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.orderId}>
              <tr onClick={() => toggleOrderDetails(order.orderId)} style={{ cursor: 'pointer' }}>
                <td>{order.orderId}</td>
                <td>{order.createdDate}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td></td>
              </tr>
              {expandedOrderId === order.orderId && (
                <tr>
                  <td colSpan="4">
                    <div className="accordion-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItemList.map(item => (
                            <tr key={item.orderItemId}>
                              <td>{item.productName}</td>
                              <td>{item.quantity}</td>
                              <td>${item.amount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default MyOrders;