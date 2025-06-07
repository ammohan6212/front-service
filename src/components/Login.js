import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      localStorage.setItem("token", data.access_token);
      navigate('/home');
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
      <h2>Login</h2>
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
        Don't have an account?
        <button onClick={() => navigate('/register')} style={{ marginLeft: "5px" }}>
          Register here
        </button>
      </p>

      <p>
        Are you a seller?
        <button onClick={() => navigate('/seller-login')} style={{ marginLeft: "5px" }}>
          Seller Login
        </button>
      </p>

      <p>
        Forgot your password?
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          style={{ marginLeft: "5px", background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          Click here
        </button>
      </p>
    </div>
  );
}

export default Login;
