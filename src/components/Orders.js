import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

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
      console.log("✅ Orders fetched:", response.data);
      setOrders(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch orders. User may not exist.');
      setOrders([]);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parsed = new Date(dateStr.slice(0, 19));
    return isNaN(parsed.getTime()) ? 'Invalid Date' : parsed.toLocaleString();
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
                <td>{order.itemName }</td>
                <td>{order.quantity || 0}</td>
                <td>₹{order.price || 0}</td>
                <td>{order.sellerName }</td>
                <td>₹{order.total || 0}</td>
                <td>{formatDate(order.createdAt)}</td>
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
