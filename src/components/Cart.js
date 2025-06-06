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
      <button onClick={handlePayClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Click here to Pay
      </button>
    </div>
  );
}

export default Cart;
