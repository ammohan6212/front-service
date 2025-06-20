import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductHome() {
  const { id } = useParams(); // Get product ID from route
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/product/get-product-details/${id}`) // Adjust URL based on your backend route
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product); // Backend should return { product: { ... } }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
    </div>
  );
}

export default ProductHome;
