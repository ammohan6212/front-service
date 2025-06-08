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
    <div style={styles.page}>
      <div style={styles.wave}></div>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryButton}>Login</button>
            <button type="button" onClick={handleClear} style={styles.secondaryButton}>Clear</button>
          </div>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.links}>
          <p>
            Don't have an account?
            <button onClick={() => navigate('/register')} style={styles.linkButton}>
              Register here
            </button>
          </p>

          <p>
            Are you a seller?
            <button onClick={() => navigate('/seller-login')} style={styles.linkButton}>
              Seller Login
            </button>
          </p>

          <p>
            Forgot your password?
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              style={styles.linkButton}
            >
              Click here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #1e3c72, #2a5298)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "120px",
    background: "url('https://svgshare.com/i/uNq.svg') repeat-x",
    animation: "wave 10s linear infinite",
    opacity: 0.8,
  },
  container: {
    position: "relative",
    zIndex: 2,
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  primaryButton: {
    flex: "1",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  secondaryButton: {
    flex: "1",
    padding: "12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  links: {
    marginTop: "20px",
    textAlign: "center",
  },
  linkButton: {
    marginLeft: "5px",
    background: "none",
    border: "none",
    color: "#1E90FF",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
  },
};

// Add CSS keyframes to animate wave
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes wave {
    0% { background-position-x: 0; }
    100% { background-position-x: 1000px; }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Login;
