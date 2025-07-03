import React, { useEffect, useState } from "react";
import axios from "axios";

function Payment() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert("⚠️ Please select a payment method.");
      return;
    }

    if (!address.trim()) {
      alert("⚠️ Please enter a delivery address.");
      return;
    }

    const username = localStorage.getItem("username") || "guest";
    const payload = selectedItems.map((item) => ({
      username,
      item_id: item._id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image_url,
      payment_method: paymentMethod,
      total: item.price * item.quantity,
      seller_name: item.seller_name,
      address, // ✅ include address in payload
    }));

    setLoading(true);

    axios
      .post("/pay/payment", payload)
      .then(() => {
        return Promise.all(
          selectedItems.map((item) =>
            axios.patch(`/product/update-quantity/${item.productId || item._id}`, {
              quantityPurchased: item.quantity,
            })
          )
        );
      })
      .then(() => {
        return Promise.all(
          selectedItems.map((item) => axios.delete(`/cart/remove/${item._id}`))
        );
      })
      .then(() => {
        alert("✅ Payment successful, stock updated, and cart cleared!");
        setSelectedItems([]);
        setAddress("");
        setPaymentMethod("");
        localStorage.removeItem("selectedCartItems");
      })
      .catch((err) => {
        console.error("❌ Error during payment process:", err);
        alert("❌ Something went wrong. Please verify your cart and stock.");
      })
      .finally(() => {
        setLoading(false);
      });
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
    paymentSection: {
      marginTop: "40px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
    },
    payButton: {
      marginTop: "30px",
      padding: "15px 30px",
      fontSize: "1.2em",
      fontWeight: "bold",
      color: "#fff",
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "block",
      marginLeft: "auto",
      transition: "transform 0.2s ease-in-out",
    },
    select: {
      padding: "10px",
      fontSize: "1em",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginTop: "10px",
    },
    label: {
      fontSize: "1.1em",
      marginBottom: "10px",
      display: "block",
    },
    textarea: {
      padding: "10px",
      fontSize: "1em",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginTop: "10px",
      resize: "vertical",
      fontFamily: "inherit",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Payment Page</h1>

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

          <div style={styles.paymentSection}>
            <label htmlFor="paymentMethod" style={styles.label}>
              Select Payment Method:
            </label>
            <select
              id="paymentMethod"
              style={styles.select}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Choose Payment Method --</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="net_banking">Net Banking</option>
            </select>

            <label htmlFor="address" style={styles.label}>
              Delivery Address:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full delivery address"
              rows={4}
              style={styles.textarea}
            />
          </div>

          <button
            style={{
              ...styles.payButton,
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto",
            }}
            onClick={handlePayNow}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {loading ? "⏳ Processing..." : "🧾 Pay Now"}
          </button>
        </>
      )}
    </div>
  );
}

export default Payment;
