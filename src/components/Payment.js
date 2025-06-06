import React, { useEffect, useState } from "react";
import axios from "axios";

function Payment() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/payment/payment") // Example API endpoint, adjust if needed
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error("Error fetching payment message:", err);
        setMessage("❌ Failed to load payment message.");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Payment Page</h1>
      <p>🛒 {message}</p>
    </div>
  );
}

export default Payment;
