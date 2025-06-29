import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/order/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch order details.');
    }
  };

  const handleRemoveOrder = async () => {
    try {
      await axios.delete(`/order/${orderId}`);
      alert('✅ Order removed successfully!');
      navigate('/'); // Go back to orders list page
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

  if (!order && !error) return <p>Loading order details...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>📝 Order Details</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {order && (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            background: '#f9f9f9',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '400px',
          }}
        >
          <h3>{order.itemName}</h3>
          <p><strong>Quantity:</strong> {order.quantity || 0}</p>
          <p><strong>Price:</strong> ₹{order.price || 0}</p>
          <p><strong>Seller:</strong> {order.sellerName}</p>
          <p><strong>Total:</strong> ₹{order.total || 0}</p>
          <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
          <button
            onClick={handleRemoveOrder}
            style={{
              marginTop: '1rem',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            ❌ Remove Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
