import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from backend
    axios.get('/order/order')  // Adjust the URL as per your backend
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("Error fetching order message:", error);
        setMessage("Failed to load order service message.");
      });
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>📦 Orders Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default Orders;
