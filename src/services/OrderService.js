const BASE_URL = 'http://localhost:8080/users';

export const getOrders = async (userId, limit = 11, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}/orders?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (userId, orderData) => {
  try {
    const buyItemList = orderData.orderItemList.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const response = await fetch(`${BASE_URL}/${userId}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyItemList }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};