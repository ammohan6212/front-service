import React, { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const data = [
    "Apple iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "Sony Headphones",
    "Dell Laptop",
    "Asus Monitor",
    "Apple MacBook",
    "Logitech Mouse",
    "HP Printer",
    "Amazon Echo"
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>🏠 Dashboard</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>🛍️ Products</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>📦 Orders</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>👤 Profile</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>⚙️ Settings</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>🚪 Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Welcome to the Home Page 🎉</h1>
        <p>You are now logged in.</p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "320px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginBottom: "20px"
          }}
        />

        {/* Results */}
        {searchTerm && results.length > 0 && (
          <ul>
            {results.map((item, index) => (
              <li key={index} style={{ padding: "5px 0" }}>{item}</li>
            ))}
          </ul>
        )}

        {searchTerm && results.length === 0 && (
          <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
}

export default Home;
