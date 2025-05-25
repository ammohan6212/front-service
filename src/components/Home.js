import React, { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  // Sample data to simulate products
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to the Home Page 🎉</h1>
      <p>You are now logged in.</p>

      {/* Search Bar with Placeholder */}
      <input
        type="text"
        placeholder="Search products..." // watermark-like text
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

      {/* Display Results */}
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
  );
}

export default Home;
