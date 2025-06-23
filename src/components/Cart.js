import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username"); // ✅ Get username from localStorage

    if (!username) {
      setError("⚠️ Please log in to view your cart.");
      return;
    }

    // ✅ Fetch cart items for this user
    axios
      .get(`/cart/get-details/${username}`)
      .then((res) => setCartItems(res.data.cartItems))
      .catch((err) => {
        console.error("❌ Error fetching cart:", err);
        setError("Failed to load cart items.");
      });
  }, []);

  const handlePayClick = () => {
    navigate("/payment");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛒 Your Cart</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {cartItems.length === 0 && !error ? (
        <p>🧺 Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} style={{ margin: "10px 0" }}>
              <img src={item.image_url} alt={item.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
              <strong>{item.name}</strong> — ₹{item.price} × {item.quantity}
            </li>
          ))}
        </ul>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayClick}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out",
          marginTop: "20px",
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
