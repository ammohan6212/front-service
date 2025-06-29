import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const sellerName = localStorage.getItem("seller_name");
  const token = localStorage.getItem("seller_token");

  const categories = [
    "Men's Clothing", "Women's Clothing", "Kid's & Baby Clothing", "Shoes & Footwear",
    "Jewelry & Watches", "Handbags & Accessories", "Lingerie & Sleepwear",
    "Computers & Laptops", "Smartphones & Tablets", "TV, Video & Audio",
    "Cameras & Photography", "Video Games & Consoles", "Wearable Technology",
    "Drones & Accessories", "Electronic Accessories", "Home & Kitchen", "Furniture & Decor",
    "Bed & Bath", "Garden & Outdoor", "Home Improvement & Tools", "Appliances",
    "Lighting & Ceiling Fans", "Skincare & Makeup", "Hair Care & Styling", "Fragrances",
    "Health Care & Supplements", "Personal Care & Wellness", "Shaving & Hair Removal",
    "Books & Literature", "eBooks & Audiobooks", "Movies & TV Shows", "Music, Vinyl & CDs",
    "Textbooks", "Athletic Apparel", "Exercise & Fitness", "Outdoor Recreation", "Team Sports",
    "Fan Shop & Memorabilia", "Cycling", "Camping & Hiking", "Action Figures & Statues",
    "Board Games & Puzzles", "Dolls & Accessories", "Building Toys (e.g., LEGO)",
    "Educational Toys", "Video Games", "Car Parts & Accessories", "Motorcycle & Powersports",
    "Tools & Equipment", "Tires & Wheels", "Industrial Supplies", "Pantry Staples",
    "Snacks & Sweets", "Coffee, Tea & Beverages", "Gourmet & Specialty Foods",
    "Organic Products", "Art & Wall Decor", "Crafting & Sewing", "Collectibles & Memorabilia",
    "Antiques", "Dog Supplies", "Cat Supplies", "Fish & Aquatic Pets", "Bird Supplies",
    "Small Animal Supplies", "Office & School Supplies", "Luggage & Travel Gear",
    "Musical Instruments", "Software", "Gift Cards"
  ];

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
    setEditedProduct({
      name: products[index].name || "",
      price: products[index].price || "",
      quantity: products[index].quantity,
      category: products[index].category || "",
      description: products[index].description || "",
      id: products[index].id || products[index]._id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "quantity" ? parseInt(value, 10) || 0 : value;
    setEditedProduct((prev) => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/product/update/${editedProduct.id}`, {
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

  const handleDelete = async (productId, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      // ✅ Delete product first
      const res = await fetch(`/product/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      // ✅ Also delete from cart using image_url
      await fetch(`/cart/delete-by-image?imageUrl=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });
      // ✅ Also delete from orders (Spring Boot endpoint)
      await fetch(`/order/delete-by-image?imageUrl=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });

      // ✅ Update local state
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error deleting product or related data:", err);
    }
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
                key={product.id}
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
                      value={editedProduct.name || ""}
                      onChange={handleChange}
                      placeholder="Name"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />
                    <textarea
                      name="description"
                      value={editedProduct.description || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      style={{ width: "100%", marginBottom: "6px" }}
                    />
                    <input
                      name="price"
                      value={editedProduct.price || ""}
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
                    <select
                      name="category"
                      value={editedProduct.category || ""}
                      onChange={handleChange}
                      style={{ width: "100%", marginBottom: "6px" }}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <button onClick={handleSave} style={{ marginRight: "10px" }}>
                      Save
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3>{product.name}</h3>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Stock Left:</strong> {product.quantity}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <button onClick={() => handleEdit(index)}>Update</button>
                    <button
                      onClick={() => handleDelete(product.id, product.image_url)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#ffdddd",
                        color: "red",
                        border: "1px solid red",
                        padding: "4px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </button>
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
