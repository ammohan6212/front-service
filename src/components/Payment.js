import React, { useEffect, useState } from "react";
import axios from "axios";

function Payment() {
  const [message, setMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch payment message from backend
    axios
      .get("/pay/payment")
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.error("Error fetching payment message:", err);
        setMessage("❌ Failed to load payment message.");
      });

    // Load selected cart items from localStorage
    const items = localStorage.getItem("selectedCartItems");
    if (items) {
      try {
        setSelectedItems(JSON.parse(items));
      } catch (e) {
        console.error("Failed to parse selectedCartItems:", e);
      }
    }
  }, []);

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const styles = {
    container: {
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5em",
      marginBottom: "30px",
      color: "#2c3e50",
    },
    apiMessage: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "1.1em",
      color: "#6c757d",
    },
    itemCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "15px",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    itemImage: {
      width: "80px",
      height: "80px",
      borderRadius: "10px",
      objectFit: "cover",
      border: "1px solid #eee",
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      margin: 0,
      fontSize: "1.4em",
      color: "#34495e",
    },
    itemInfo: {
      margin: "5px 0",
      fontSize: "1em",
      color: "#555",
    },
    total: {
      textAlign: "right",
      fontSize: "1.5em",
      fontWeight: "bold",
      color: "#28a745",
      marginTop: "30px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Payment Page</h1>
      <p style={styles.apiMessage}>🛒 {message}</p>

      {selectedItems.length === 0 ? (
        <p>No items selected for payment.</p>
      ) : (
        <>
          {selectedItems.map((item) => (
            <div key={item._id} style={styles.itemCard}>
              <img src={item.image_url} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemInfo}>Quantity: {item.quantity}</p>
                <p style={styles.itemInfo}>Price: ₹{item.price} each</p>
              </div>
            </div>
          ))}

          <p style={styles.total}>Total: ₹{calculateTotal()}</p>
        </>
      )}
    </div>
  );
}

export default Payment;
