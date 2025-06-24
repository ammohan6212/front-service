import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const sellerName = localStorage.getItem("seller_name");
  const token = localStorage.getItem("seller_token");

  useEffect(() => {
    if (!sellerName || !token) {
      navigate("/seller-login");
      return;
    }

    fetch(`/product/seller-products?seller=${sellerName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        console.error("Failed to fetch seller products:", err);
      });
  }, [sellerName, token, navigate]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedProduct({ ...products[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/product/update/${editedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedProduct),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = [...products];
      updated[editingIndex] = editedProduct;
      setProducts(updated);
      setEditingIndex(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedProduct({});
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>📦 Seller Dashboard</h1>

      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product, index) => {
            const isEditing = index === editingIndex;

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "16px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/150"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />

                {isEditing ? (
                  <>
                    <input
                      name="name"
                      value={editedProduct.name}
                      onChange={handleChange}
                      placeholder="Name"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />
                    <input
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChange}
                      placeholder="Price"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />
                    <input
                      name="quantity"
                      value={editedProduct.quantity}
                      onChange={handleChange}
                      placeholder="Stock Left"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />
                    <input
                      name="category"
                      value={editedProduct.category}
                      onChange={handleChange}
                      placeholder="Category"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />

                    <button onClick={handleSave} style={{ marginRight: "10px" }}>
                      Save
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                    <p>
                      <strong>Stock Left:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <button onClick={() => handleEdit(index)}>Update</button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;
