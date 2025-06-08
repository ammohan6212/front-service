import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const navigate = useNavigate();

  const products = [
    { name: "Apple iPhone", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=iPhone" },
    { name: "Samsung Galaxy", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=Galaxy" },
    { name: "Google Pixel", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=Pixel" },
    { name: "Sony Headphones", category: "Electronics", image: "https://via.placeholder.com/150x150?text=Headphones" },
    { name: "Dell Laptop", category: "Electronics", image: "https://via.placeholder.com/150x150?text=Dell+Laptop" },
    { name: "Leather Jacket", category: "Fashion", image: "https://via.placeholder.com/150x150?text=Jacket" },
    { name: "Smartwatch", category: "Fashion", image: "https://via.placeholder.com/150x150?text=Watch" },
    { name: "Vacuum Cleaner", category: "Home Gadgets", image: "https://via.placeholder.com/150x150?text=Vacuum" },
    { name: "Smart Bulb", category: "Home Gadgets", image: "https://via.placeholder.com/150x150?text=Smart+Bulb" },
  ];

  const categories = ["All", "Mobiles", "Fashion", "Home Gadgets", "Electronics"];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value, activeCategory);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search, category) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setResults(filtered);
  };

  const handleProductClick = (product) => {
    alert(`You clicked on ${product.name}`);
  };

  const handleMenuClick = (item) => {
    switch (item) {
      case "Cart":
        navigate("/cart");
        break;
      case "Orders":
        navigate("/order");
        break;
      default:
        alert(`You clicked on ${item}`);
    }
  };

  const displayedProducts =
    (searchTerm || activeCategory !== "All") && results.length > 0
      ? results
      : (searchTerm || activeCategory !== "All") && results.length === 0
      ? []
      : products;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: menuOpen ? "240px" : "80px",
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          padding: "20px",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            color: "#ecf0f1",
            border: "none",
            cursor: "pointer",
            fontSize: "22px",
            marginBottom: "30px",
            textAlign: "left",
            outline: "none",
          }}
        >
          {menuOpen ? "☰ Close" : "☰"}
        </button>
        {menuOpen && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #34495e",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#34495e")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "50px 40px",
          overflowY: "auto",
          background: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
        }}
      >
        <h1 style={{ fontSize: "32px", color: "#2c3e50" }}>🏠 Home Page</h1>
        <p style={{ marginBottom: "30px", fontSize: "16px", color: "#34495e" }}>
          Welcome! You are now logged in.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "14px 18px",
            width: "100%",
            maxWidth: "500px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "30px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />

        {/* Categories */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "10px 20px",
                backgroundColor: activeCategory === category ? "#2980b9" : "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background-color 0.3s ease",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
          {displayedProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "12px",
                }}
              />
              <strong style={{ fontSize: "16px", color: "#2c3e50" }}>{product.name}</strong>
              <p style={{ color: "#7f8c8d", fontSize: "14px" }}>{product.category}</p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayedProducts.length === 0 && (
          <p style={{ marginTop: "20px", color: "#888", textAlign: "center" }}>
            No products found for "{searchTerm}" in "{activeCategory}".
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
