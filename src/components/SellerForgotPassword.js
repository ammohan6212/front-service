import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SellerForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/seller-forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Password reset link sent to your email.");
    } else {
      setMessage(data.detail || "Failed to send reset link.");
    }
  };

  return (
    <div>
      <h2>Seller Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Send Reset Link
        </button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate('/seller-login')} style={{ marginTop: "10px" }}>
        Back to Login
      </button>
    </div>
  );
}

export default SellerForgotPassword;
