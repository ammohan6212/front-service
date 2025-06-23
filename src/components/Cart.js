import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      setError("⚠️ Please log in to view your cart.");
      return;
    }

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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: "300px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <img
                src={item.image_url}
                alt={item.name}
                style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }}
              />
              <div>
                <h3 style={{ margin: "0 0 8px 0" }}>{item.name}</h3>
                <p style={{ margin: 0 }}>₹{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Button */}
      {cartItems.length > 0 && (
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
            marginTop: "30px",
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
      )}
    </div>
  );
}

export default Cart;
