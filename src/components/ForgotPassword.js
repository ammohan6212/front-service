import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0); // in seconds
  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("OTP sent to your email. Please enter it below.");
      setOtpSent(true);
      setTimer(5 * 60); // 5 minutes = 300 seconds
      localStorage.setItem("user_reset_email", email);
    } else {
      setMessage(data.detail || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (timer === 0) {
      setMessage("OTP expired. Please resend OTP.");
      return;
    }

    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate('/reset-password'); // Navigate to ResetPassword page
    } else {
      setMessage(data.detail || "Invalid OTP.");
    }
  };

  const handleResendOtp = async () => {
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("New OTP sent to your email.");
      setTimer(5 * 60); // reset timer
    } else {
      setMessage(data.detail || "Failed to resend OTP.");
    }
  };

  // Helper function to format timer MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>User Forgot Password</h2>

      {/* Email Form */}
      {!otpSent && (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Send OTP
          </button>
        </form>
      )}

      {/* OTP Form */}
      {otpSent && (
        <div style={{ marginTop: "20px" }}>
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={timer === 0} // disable if expired
            />
            <button type="submit" style={{ marginLeft: "10px" }} disabled={timer === 0}>
              Verify OTP
            </button>
          </form>

          {/* Countdown Timer */}
          <p>Time Remaining: {formatTime(timer)}</p>

          {/* Resend OTP button */}
          {timer === 0 && (
            <button onClick={handleResendOtp} style={{ marginTop: "10px" }}>
              Resend OTP
            </button>
          )}
        </div>
      )}

      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
