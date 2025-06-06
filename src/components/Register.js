import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // ✅ Add this import

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Add this line

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      navigate('/');
    } else {
      setMessage(data.detail || "Registration failed");
    }
  };

  const handleClear = () => {
    setForm({ username: "", email: "", password: "" });
    setMessage("");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
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

export default Register;
