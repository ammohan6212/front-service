import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = () => {
    const username = localStorage.getItem("username");

    if (!username) {
      setError("⚠️ Please log in to view your cart.");
      setLoading(false);
      return;
    }

    axios
      .get(`/cart/get-details/${username}`)
      .then((res) => {
        setCartItems(res.data.cartItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching cart:", err);
        setError("Failed to load cart items.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`/cart/remove/${itemId}`)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      })
      .catch((err) => {
        console.error("❌ Failed to remove item:", err);
        alert("Failed to remove item.");
      });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    axios
      .patch(`/cart/update-quantity/${itemId}`, { quantity: newQuantity })
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((err) => {
        console.error("❌ Failed to update quantity:", err);
        alert("Failed to update quantity.");
      });
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handlePayClick = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to payment.");
      return;
    }

    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
    navigate("/payment");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛒 Your Cart</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p style={{ fontSize: "18px" }}>⏳ Loading your cart...</p>
      ) : cartItems.length === 0 && !error ? (
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
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* ✅ Checkbox for selection */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => toggleSelectItem(item._id)}
                style={{ alignSelf: "flex-start", marginBottom: "10px" }}
              />

              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ margin: "0 0 8px 0" }}>{item.name}</h3>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  style={{
                    padding: "4px 10px",
                    fontSize: "16px",
                    marginRight: "8px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  style={{
                    padding: "4px 10px",
                    fontSize: "16px",
                    marginLeft: "8px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              <p style={{ margin: "0 0 10px 0" }}>₹{item.price} each</p>

              <button
                onClick={() => handleRemoveItem(item._id)}
                style={{
                  padding: "6px 12px",
                  fontSize: "14px",
                  color: "#fff",
                  backgroundColor: "#dc3545",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && cartItems.length > 0 && (
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
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Click here to Pay
        </button>
      )}
    </div>
  );
}

export default Cart;
