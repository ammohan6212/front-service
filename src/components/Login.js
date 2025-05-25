import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message); // ✅ "Login successful"
      localStorage.setItem("token", data.access_token);
      navigate('/home'); // Navigate to the homepage
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
        Already have an account?
        <button onClick={() => navigate('/')} style={{ marginLeft: "5px" }}>
          Login here
        </button>
      </p>
    </div>
  );
}

export default Login;