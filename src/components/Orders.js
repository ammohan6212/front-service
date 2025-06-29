import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parsed = new Date(dateStr.slice(0, 19));
    return isNaN(parsed.getTime()) ? 'Invalid Date' : parsed.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
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
              onClick={() => handleOrderClick(order.id)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                background: '#f9f9f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#007185' }}>{order.itemName}</h3>
              <p style={{ margin: 0, color: '#555' }}>
                <strong>Order Date:</strong> {formatDate(order.createdAt)}
              </p>
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
