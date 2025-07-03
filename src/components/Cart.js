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

    const selectedItemDetails = cartItems.filter((item) =>
      selectedItems.includes(item._id)
    );

    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItemDetails));
    navigate("/payment");
  };

  const styles = {
    cartContainer: {
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    cartTitle: {
      textAlign: "center",
      fontSize: "2.5em",
      marginBottom: "30px",
      color: "#2c3e50",
    },
    errorMessage: {
      color: "#dc3545",
      textAlign: "center",
      fontSize: "1.1em",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "8px",
    },
    loadingMessage: {
      textAlign: "center",
      fontSize: "1.2em",
      color: "#6c757d",
      padding: "20px",
      backgroundColor: "#e9ecef",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    emptyCartMessage: {
      textAlign: "center",
      fontSize: "1.2em",
      color: "#6c757d",
      padding: "20px",
      backgroundColor: "#e9ecef",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    cartItemsList: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },
    cartItemWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    itemCheckbox: {
      transform: "scale(1.6)",
      cursor: "pointer",
      minWidth: "24px",
      minHeight: "24px",
    },
    cartItemCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "15px",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    itemImage: {
      width: "100px",
      height: "100px",
      borderRadius: "10px",
      objectFit: "cover",
      marginBottom: "15px",
      border: "1px solid #eee",
    },
    itemName: {
      margin: "0 0 10px 0",
      fontSize: "1.6em",
      color: "#34495e",
      textAlign: "center",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid #ced4da",
    },
    quantityButton: {
      padding: "8px 15px",
      fontSize: "1.2em",
      backgroundColor: "#f0f0f0",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    itemQuantity: {
      padding: "8px 15px",
      fontSize: "1.2em",
      fontWeight: "bold",
      color: "#495057",
      minWidth: "40px",
      textAlign: "center",
    },
    itemPrice: {
      margin: "0 0 20px 0",
      fontSize: "1.3em",
      fontWeight: "600",
      color: "#28a745",
    },
    removeButton: {
      padding: "10px 20px",
      fontSize: "1.1em",
      color: "#fff",
      backgroundColor: "#dc3545",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease, transform 0.1s ease",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
    },
    payButton: {
      display: "block",
      margin: "40px auto 20px auto",
      padding: "15px 30px",
      fontSize: "1.4em",
      fontWeight: "bold",
      color: "#fff",
      background: "linear-gradient(135deg, #6f42c1, #007bff)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
  };

  return (
    <div style={styles.cartContainer}>
      <h1 style={styles.cartTitle}>🛒 Your Cart</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}

      {loading ? (
        <p style={styles.loadingMessage}>⏳ Loading your cart...</p>
      ) : cartItems.length === 0 && !error ? (
        <p style={styles.emptyCartMessage}>🧺 Your cart is empty.</p>
      ) : (
        <div style={styles.cartItemsList}>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItemWrapper}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => toggleSelectItem(item._id)}
                style={styles.itemCheckbox}
              />

              <div style={styles.cartItemCard}>
                <img src={item.image_url} alt={item.name} style={styles.itemImage} />
                <h3 style={styles.itemName}>{item.name}</h3>

                <div style={styles.quantityControl}>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      ...styles.quantityButton,
                      borderRight: "1px solid #ced4da",
                    }}
                  >
                    −
                  </button>
                  <span style={styles.itemQuantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    style={{
                      ...styles.quantityButton,
                      borderLeft: "1px solid #ced4da",
                    }}
                  >
                    +
                  </button>
                </div>

                <p style={styles.itemPrice}>₹{item.price} each</p>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  style={styles.removeButton}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && cartItems.length > 0 && (
        <button
          onClick={handlePayClick}
          style={styles.payButton}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.03)";
            e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.25)";
          }}
        >
          Click here to Pay
        </button>
      )}
    </div>
  );
}

export default Cart;
