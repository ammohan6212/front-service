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

  const removeOrder = async (orderId) => {
    try {
      // Optional: Call API to remove the order
      await axios.delete(`/order/${orderId}`);
      // Remove from UI
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error("❌ Failed to delete order:", err);
      setError("❌ Failed to delete order.");
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                background: '#f9f9f9',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <h3>{order.itemName}</h3>
              <p><strong>Quantity:</strong> {order.quantity || 0}</p>
              <p><strong>Price:</strong> ₹{order.price || 0}</p>
              <p><strong>Seller:</strong> {order.sellerName}</p>
              <p><strong>Total:</strong> ₹{order.total || 0}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <button
                onClick={() => removeOrder(order.id)}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '0.5rem',
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ❌ Remove Order
              </button>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default UserOrders;
