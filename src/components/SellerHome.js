import React from "react";
import { useNavigate } from 'react-router-dom';

function SellerHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear seller token and navigate back to seller login
    localStorage.removeItem("seller_token");
    navigate('/seller-login');
  };

  return (
    <div>
      <h2>Welcome to Seller Home Page</h2>
      <p>You are now logged in as a Seller.</p>

      <button onClick={() => navigate('/seller-dashboard')} style={{ marginRight: "10px" }}>
        Go to Seller Dashboard
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default SellerHome;
