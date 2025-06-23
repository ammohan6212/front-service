import React, { useEffect, useState } from "react";
import axios from "axios";

function Payment() {
  const [message, setMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // Fetch message from backend
    axios
      .get("/pay/payment")
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.error("Error fetching payment message:", err);
        setMessage("❌ Failed to load payment message.");
      });

    // Load selected items
    const items = localStorage.getItem("selectedCartItems");
    if (items) {
      try {
        setSelectedItems(JSON.parse(items));
      } catch (e) {
        console.error("Failed to parse selectedCartItems:", e);
      }
    }
  }, []);

  const calculateTotal = () =>
    selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert("⚠️ Please select a payment method.");
      return;
    }

    alert(`✅ Payment processed using ${paymentMethod}`);
    // Example POST to backend
    // axios.post('/pay/checkout', { items: selectedItems, method: paymentMethod })
  };

  const styles = {
    container: {
      padding: "40px 20px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5em",
      marginBottom: "10px",
      color: "#343a40",
    },
    apiMessage: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "1.1em",
      color: "#6c757d",
    },
    itemCard: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "20px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    },
    itemImage: {
      width: "80px",
      height: "80px",
      borderRadius: "10px",
      objectFit: "cover",
      border: "1px solid #eee",
      marginRight: "16px",
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      margin: 0,
      fontSize: "1.4em",
      fontWeight: 600,
      color: "#212529",
    },
    itemInfo: {
      margin: "6px 0",
      fontSize: "1em",
      color: "#555",
    },
    total: {
      textAlign: "right",
      fontSize: "1.6em",
      fontWeight: "bold",
      color: "#28a745",
      marginTop: "30px",
    },
    noItemsText: {
      textAlign: "center",
      fontSize: "1.2em",
      padding: "20px",
      color: "#999",
    },
    paymentOptionsContainer: {
      marginTop: "30px",
      textAlign: "center",
    },
    label: {
      display: "block",
      fontSize: "1.2em",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    select: {
      padding: "10px",
      fontSize: "1em",
      width: "250px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "20px",
      outline: "none",
    },
    payButton: {
      display: "block",
      margin: "20px auto 0 auto",
      padding: "15px 30px",
      fontSize: "1.4em",
      fontWeight: "bold",
      color: "#fff",
      background: "linear-gradient(135deg, #00c9ff, #92fe9d)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      transition: "all 0.2s ease-in-out",
      textTransform: "uppercase",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Payment Summary</h1>
      <p style={styles.apiMessage}>🛒 {message}</p>

      {selectedItems.length === 0 ? (
        <p style={styles.noItemsText}>No items selected for payment.</p>
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
          <p style={styles.total}>🧾 Total: ₹{calculateTotal()}</p>

          {/* 🔘 Payment Method Dropdown */}
          <div style={styles.paymentOptionsContainer}>
            <label style={styles.label}>Select Payment Method:</label>
            <select
              style={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Choose --</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {/* ✅ Pay Now Button */}
          <button
            style={styles.payButton}
            onClick={handlePayNow}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}

export default Payment;
