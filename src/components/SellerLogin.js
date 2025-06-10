import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SellerLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/seller-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message); // ✅ "Login successful"
      localStorage.setItem("seller_token", data.access_token);
      navigate('/seller-home'); // Navigate to seller home page
    } else {
      setMessage(data.detail || "Login failed");
    }
  };

  const handleClear = () => {
    setForm({ username: "", password: "" });
    setMessage("");
  };

  return (
    <div>
      <h2>Seller Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: "10px" }}>
          Clear
        </button>
      </form>
      <p>{message}</p>

      <p>
        Don't have a seller account?
        <button onClick={() => navigate('/seller-register')} style={{ marginLeft: "5px" }}>
          Register here
        </button>
      </p>
      <p>
      <button 
        type="button" 
        onClick={() => navigate('/seller-forgot-password')} 
        style={{ marginTop: "10px", background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
      >
        Forgot Password?
      </button>
      </p>
    </div>
  );
}

export default SellerLogin;
