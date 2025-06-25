import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerOrders = () => {
  const [sellerName, setSellerName] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSeller = localStorage.getItem('seller_name');
    if (storedSeller) {
      setSellerName(storedSeller);
      fetchSellerOrders(storedSeller);
    } else {
      setError("⚠️ No seller name found in localStorage.");
    }
  }, []);

  const fetchSellerOrders = async (seller) => {
    try {
      const response = await axios.get(`/order/seller/${seller}`);
      console.log("✅ Seller orders fetched:", response.data);
      setOrders(response.data);
      setError('');
    } catch (err) {
      console.error("❌ Failed to fetch seller orders:", err);
      setError("❌ Failed to fetch seller orders. Seller may not exist.");
      setOrders([]);
    }
  };

  const removeOrder = async (orderId) => {
    try {
      await axios.delete(`/order/${orderId}`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
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
      <h2>📦 Orders for Seller: {sellerName || 'N/A'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: '1rem',
            padding: '1rem 0',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                minWidth: '300px',
                maxWidth: '300px',
                flex: '0 0 auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                background: '#f9f9f9',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                scrollSnapAlign: 'start',
              }}
            >
              <h3>{order.itemName}</h3>
              <p><strong>Buyer:</strong> {order.buyerName || 'N/A'}</p>
              <p><strong>Quantity:</strong> {order.quantity || 0}</p>
              <p><strong>Price:</strong> ₹{order.price || 0}</p>
              <p><strong>Total:</strong> ₹{order.total || 0}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
              <button
                onClick={() => removeOrder(order.id)}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                ❌ Remove Order
              </button>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>No orders found for this seller.</p>
      )}
    </div>
  );
};

export default SellerOrders;
