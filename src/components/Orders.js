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

  const removeOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>📦 Orders for {username || 'N/A'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length > 0 ? (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: '400px',
                border: '1px solid #ccc',
                padding: '1rem',
                marginRight: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                background: '#f9f9f9',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <h3>{order.item_name}</h3>
              <img
                src={order.image_url}
                alt={order.item_name}
                style={{ maxWidth: '100%', maxHeight: '100px', marginBottom: '1rem' }}
              />
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Seller:</strong> {order.seller_name}</p>
              <p><strong>Payment Method:</strong> {order.payment_method}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <button
                onClick={() => removeOrder(order.id)}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🗑️ Remove
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
