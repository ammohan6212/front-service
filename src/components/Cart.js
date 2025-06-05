import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/cart/cart")
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error("Error fetching cart message:", err);
        setMessage("❌ Failed to load cart message.");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Cart</h1>
      <p>{message}</p>
    </div>
  );
}

export default Cart;
