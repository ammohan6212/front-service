import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Load username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchOrders(storedUsername);
    } else {
      setError("⚠️ No username found in localStorage.");
    }
  }, []);

  const fetchOrders = async (user) => {
    try {
      const response = await axios.get(`/order/user/${user}`);
      setOrders(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch orders. User may not exist.');
      setOrders([]);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>📦 Orders for {username || 'N/A'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.itemName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>{order.sellerName}</td>
                <td>₹{order.total}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default UserOrders;
