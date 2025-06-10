import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(() => {
    // Optional: persist timer across reloads
    const savedTimer = localStorage.getItem("otp_timer_remaining");
    return savedTimer ? parseInt(savedTimer, 10) : 0;
  });

  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTime = prevTimer - 1;
          localStorage.setItem("otp_timer_remaining", newTime);
          return newTime;
        });
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      localStorage.removeItem("otp_timer_remaining");
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/forgot-user-password" /* Correct this if using /api/verify-otp */, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("OTP sent to your email. Please enter it below.");
      setOtpSent(true);
      setTimer(5 * 60); // 5 minutes
      localStorage.setItem("user_reset_email", email);
      localStorage.setItem("otp_timer_remaining", 5 * 60);
    } else {
      setMessage(data.detail || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("user_reset_email");

    if (!storedEmail) {
      setMessage("Email not found in session. Please resend OTP.");
      return;
    }

    if (timer === 0) {
      setMessage("OTP expired. Please resend OTP.");
      return;
    }

    console.log("Verify OTP request body:", { email: storedEmail, otp });

    const response = await fetch("/api/verify-user-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: storedEmail, otp }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Password reset successful. Redirecting to login...");
      localStorage.removeItem("otp_timer_remaining");
      setMessage("OTP verified successfully!");
      navigate('/reset-password');
    } else {
      setMessage(data.detail || "Invalid OTP.");
    }
  };

  const handleResendOtp = async () => {
    const storedEmail = localStorage.getItem("user_reset_email");

    if (!storedEmail) {
      setMessage("Email not found in session. Please start again.");
      return;
    }

    const response = await fetch("/api/forgot-user-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: storedEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("New OTP sent to your email.");
      setTimer(5 * 60);
      localStorage.setItem("otp_timer_remaining", 5 * 60);
    } else {
      setMessage(data.detail || "Failed to resend OTP.");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>User Forgot Password</h2>

      {!otpSent && (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ width: "100%", padding: "8px" }}>
            Send OTP
          </button>
        </form>
      )}

      {otpSent && (
        <div style={{ marginTop: "20px" }}>
          <p>Email: {localStorage.getItem("user_reset_email")}</p>

          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={timer === 0}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <button type="submit" style={{ width: "100%", padding: "8px" }} disabled={timer === 0}>
              Verify OTP
            </button>
          </form>

          <p>Time Remaining: {formatTime(timer)}</p>

          {timer === 0 && (
            <button onClick={handleResendOtp} style={{ marginTop: "10px", width: "100%", padding: "8px" }}>
              Resend OTP
            </button>
          )}
        </div>
      )}

      <p style={{ color: "red", marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default ForgotPassword;
