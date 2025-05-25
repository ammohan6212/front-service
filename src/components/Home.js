import React, { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    { name: "Apple iPhone", category: "Mobiles" },
    { name: "Samsung Galaxy", category: "Mobiles" },
    { name: "Google Pixel", category: "Mobiles" },
    { name: "Sony Headphones", category: "Electronics" },
    { name: "Dell Laptop", category: "Electronics" },
    { name: "Asus Monitor", category: "Electronics" },
    { name: "Apple MacBook", category: "Electronics" },
    { name: "Logitech Mouse", category: "Electronics" },
    { name: "HP Printer", category: "Electronics" },
    { name: "Amazon Echo", category: "Electronics" },
    { name: "Leather Jacket", category: "Fashion" },
    { name: "Sneakers", category: "Fashion" },
    { name: "Smartwatch", category: "Fashion" },
    { name: "Vacuum Cleaner", category: "Home Gadgets" },
    { name: "Smart Bulb", category: "Home Gadgets" },
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

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        fontFamily: "Segoe UI, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: menuOpen ? "240px" : "80px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          {menuOpen ? "☰ Close" : "☰ Menu"}
        </button>

        {menuOpen && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #333",
                    cursor: "pointer",
                  }}
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
          backgroundColor: "#f8f9fa",
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "32px" }}>🏠 Home Page</h1>
        <p style={{ marginBottom: "30px", fontSize: "16px" }}>
          Welcome! You are now logged in.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "12px 18px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        />

        {/* Product Categories */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "10px 16px",
                backgroundColor: activeCategory === category ? "#0056b3" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div>
          {(searchTerm || activeCategory !== "All") && results.length > 0 && (
            <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
              {results.map((item, index) => (
                <li key={index} style={{ padding: "6px 0" }}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          {(searchTerm || activeCategory !== "All") && results.length === 0 && (
            <p style={{ color: "#888" }}>
              No products found for "{searchTerm}" in "{activeCategory}".
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
