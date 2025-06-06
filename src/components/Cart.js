import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate hook

function Cart() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 initialize navigate

  useEffect(() => {
    axios
      .get("/cart/cart")
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error("Error fetching cart message:", err);
        setMessage("❌ Failed to load cart message.");
      });
  }, []);

  // 👇 Button click handler
  const handlePayClick = () => {
    // You can also call an API here for payment initiation if needed
    navigate("/payment"); // 👈 redirect to /payment route
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Cart</h1>
      <p>{message}</p>

      {/* Pay button */}
      <button
      onClick={handlePayClick}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff", // text color
        background: "linear-gradient(90deg, #ff7e5f, #feb47b)", // gradient background
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseOver={(e) => {
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.target.style.transform = "scale(1)";
      }}
    >
      Click here to Pay
    </button>

    </div>
  );
}

export default Cart;
