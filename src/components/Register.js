import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const getPasswordValidationStatus = (password) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

const isPasswordStrong = (validationStatus) => {
  return (
    validationStatus.length &&
    validationStatus.uppercase &&
    validationStatus.lowercase &&
    validationStatus.digit &&
    validationStatus.specialChar
  );
};

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const navigate = useNavigate();

  const OTP_VALIDITY_SECONDS = 300; // 5 minutes

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email || !form.username) {
      setMessage("Please enter username and email first.");
      return;
    }

    if (!isPasswordStrong(getPasswordValidationStatus(form.password))) {
      setMessage("Password does not meet the required criteria.");
      return;
    }

    setSendingOtp(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("/api/start-user-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "OTP sent to your email.");
        setOtpSent(true);
        setCountdown(OTP_VALIDITY_SECONDS);
      } else if (response.status === 409) {
        setMessage(data.detail);
      } else {
        setMessage(data.detail || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Network error while sending OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();

    if (countdown === 0) {
      setMessage("OTP expired. Please resend OTP.");
      return;
    }

    if (!otp) {
      setMessage("Please enter OTP.");
      return;
    }

    setVerifyingOtp(true);
    setMessage("");

    try {
      const response = await fetch("/api/user-register-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful.");
        navigate('/');
      } else {
        if (response.status === 401) {
          setMessage("OTP is incorrect or expired. Please try again.");
        } else if (response.status === 409) {
          setMessage(data.detail);
        } else {
          setMessage(data.detail || "OTP verification failed.");
        }
      }
    } catch (error) {
      setMessage("Network error while verifying OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleClear = () => {
    setForm({ username: "", email: "", password: "" });
    setOtp("");
    setOtpSent(false);
    setCountdown(0);
    setMessage("");
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div>
      <h2>User Registration (with OTP)</h2>
      <form onSubmit={handleVerifyOtpAndRegister}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
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
        {/* Password validation block */}
        {form.password && (() => {
          const validationStatus = getPasswordValidationStatus(form.password);
          const anyFailed = Object.values(validationStatus).some((v) => !v);

          return !isPasswordStrong(validationStatus) ? (
            <div
              style={{
                marginTop: "10px",
                color: anyFailed ? "red" : "green",
                border: anyFailed ? "1px solid red" : "1px solid green",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p style={{ margin: "0 0 5px 0" }}>Password must:</p>
              {Object.entries(validationStatus).map(([key, valid]) => {
                let label = "";
                if (key === "length") label = "At least 8 characters";
                if (key === "uppercase") label = "At least 1 uppercase letter";
                if (key === "lowercase") label = "At least 1 lowercase letter";
                if (key === "digit") label = "At least 1 digit";
                if (key === "specialChar") label = "At least 1 special character";

                return (
                  <div key={key}>
                    {valid ? "✅" : "❌"} {label}
                  </div>
                );
              })}
            </div>
          ) : null;
        })()}

        {!otpSent && (
          <button
            type="button"
            onClick={handleSendOtp}
            style={{ marginTop: "10px" }}
            disabled={sendingOtp}
          >
            {sendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {otpSent && (
          <>
            <input
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ display: "block", marginTop: "10px" }}
            />
            <button
              type="submit"
              style={{ marginTop: "10px" }}
              disabled={verifyingOtp}
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP & Register"}
            </button>

            <div style={{ marginTop: "10px" }}>
              OTP valid for: <strong>{formatTime(countdown)}</strong>
            </div>

            {otpSent && countdown === 0 && (
              <div style={{ color: "red", marginTop: "10px" }}>
                OTP has expired. Please click Resend OTP to get a new one.
              </div>
            )}

            <button
              type="button"
              onClick={handleSendOtp}
              style={{ marginTop: "10px" }}
              disabled={countdown > 0 || sendingOtp}
            >
              {sendingOtp ? "Sending..." : "Resend OTP"}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={handleClear}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Clear
        </button>
      </form>

      <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>

      <p style={{ marginTop: "20px" }}>
        Already have an account?
        <button onClick={() => navigate('/')} style={{ marginLeft: "5px" }}>
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;
