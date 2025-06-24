import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductHome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityToBuy, setQuantityToBuy] = useState(1);

  useEffect(() => {
    fetch(`/product/get-product-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("⚠️ Please log in to add items to cart.");
      navigate("/login");
      return;
    }

    const cartItem = {
      username,
      productId: product._id || product.id,
      name: product.name,
      quantity: quantityToBuy,
      price: product.price,
      image_url: product.image_url || "https://via.placeholder.com/150",
    };

    fetch("/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    })
      .then((res) => {
        if (res.ok) {
          alert(`✅ Added ${quantityToBuy} of ${product.name} to cart.`);
        } else {
          alert("❌ Failed to add to cart.");
        }
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("❌ Something went wrong.");
      });
  };

  const increaseQuantity = () => {
    if (product && quantityToBuy < product.quantity) {
      setQuantityToBuy(quantityToBuy + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantityToBuy > 1) {
      setQuantityToBuy(quantityToBuy - 1);
    }
  };

  if (loading) {
    return <p style={{ padding: "30px", fontSize: "20px" }}>⏳ Loading product...</p>;
  }

  if (!product) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>❌ Product not found</h2>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: "10px" }}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px", padding: "8px 16px" }}>
        ← Back
      </button>

      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>{product.name}</h1>

      <img
        src={product.image_url || "https://via.placeholder.com/400"}
        alt={product.name}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description || "No description provided."}</p>
      <p><strong>Price:</strong> ₹{product.price || "N/A"}</p>
      <p>
        <strong>Quantity Left:</strong>{" "}
        {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
      </p>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <button onClick={decreaseQuantity} style={qtyButtonStyle}>−</button>
        <span style={{ margin: "0 15px", fontSize: "18px" }}>{quantityToBuy}</span>
        <button onClick={increaseQuantity} style={qtyButtonStyle}>+</button>
      </div>

      {/* ✅ Add to Cart Button (Disabled if Out of Stock) */}
      <button
        onClick={handleAddToCart}
        disabled={product.quantity === 0}
        title={product.quantity === 0 ? "Out of stock" : ""}
        style={{
          marginTop: "25px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: product.quantity === 0 ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: product.quantity === 0 ? "not-allowed" : "pointer",
          opacity: product.quantity === 0 ? 0.6 : 1,
        }}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}

const qtyButtonStyle = {
  padding: "8px 14px",
  fontSize: "18px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
};

export default ProductHome;
