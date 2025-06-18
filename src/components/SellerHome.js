import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function SellerHome() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState(null);
  const [productImage, setProductImage] = useState(null);

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

  const categoryOptions = categories.map(cat => ({ label: cat, value: cat }));

  const handleLogout = () => {
    localStorage.removeItem("seller_token");
    navigate('/seller-login');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!productCategory) {
      alert("Please select a product category.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("category", productCategory.value);
    formData.append("image", productImage);

    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product uploaded successfully!");
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductCategory(null);
        setProductImage(null);
        document.getElementById("productImage").value = null;
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("An error occurred while uploading the product.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome to Seller Home</h2>
        <div>
          <button onClick={() => navigate('/seller-dashboard')} style={styles.headerButton}>
            Dashboard
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <p style={styles.welcome}>You are logged in as a Seller.</p>

      <div style={styles.card}>
        <h3 style={styles.title}>Upload New Product</h3>
        <form onSubmit={handleProductSubmit} style={styles.form}>
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            style={styles.textarea}
          />

          <label style={styles.label}>Product Price ($)</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Product Category</label>
          <Select
            options={categoryOptions}
            value={productCategory}
            onChange={setProductCategory}
            placeholder="Select or search category..."
            isClearable
          />

          <label style={styles.label}>Product Image</label>
          <input
            type="file"
            id="productImage"
            onChange={(e) => setProductImage(e.target.files[0])}
            accept="image/*"
            required
            style={styles.fileInput}
          />

          <button type="submit" style={styles.submitButton}>Upload Product</button>
        </form>
      </div>
    </div>
  );
}

// 💅 Inline Styles
const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  headerButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 12px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  welcome: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px",
    maxWidth: "500px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    margin: "0 auto",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "80px"
  },
  fileInput: {
    fontSize: "14px",
  },
  submitButton: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default SellerHome;
