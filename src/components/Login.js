import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

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
      setMessage(data.message || "Login successful");
      localStorage.setItem("token", data.access_token);
    } else {
      setMessage(data.detail || "Login failed");
    }
  };

  const handleClear = () => {
    setForm({ email: "", password: "" });
    setMessage("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: "10px" }}>
          Clear
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
