import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // <-- Import react-select

function SellerHome() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState(null); // Now stores { label, value }
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
    formData.append("category", productCategory.value); // Use .value
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Welcome to Seller Home Page</h2>
        <div>
          <button onClick={() => navigate('/seller-dashboard')} style={{ marginRight: "10px" }}>
            Go to Seller Dashboard
          </button>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <p>You are now logged in as a Seller.</p>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h3>Upload a New Product</h3>
        <form onSubmit={handleProductSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "10px" }}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text" id="productName" value={productName}
              onChange={(e) => setProductName(e.target.value)} required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription" value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)} required
              style={{ width: "100%", padding: "8px", minHeight: "80px" }}
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price ($):</label>
            <input
              type="number" id="productPrice" value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)} required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Product Category:</label>
            <Select
              options={categoryOptions}
              value={productCategory}
              onChange={setProductCategory}
              placeholder="Select or search category..."
              isClearable
            />
          </div>
          <div>
            <label htmlFor="productImage">Product Image:</label>
            <input
              type="file" id="productImage"
              onChange={(e) => setProductImage(e.target.files[0])}
              accept="image/*" required
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>Upload Product</button>
        </form>
      </div>
    </div>
  );
}

export default SellerHome;
