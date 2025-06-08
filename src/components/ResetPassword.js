import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("user_reset_email");
    console.log("Email is", email);

    const response = await fetch("/api/reset-user-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_password: password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        localStorage.removeItem("user_reset_email");
        navigate('/');
      }, 2000);
    } else {
      setMessage(data.detail || "Failed to reset password.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Reset Password
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
