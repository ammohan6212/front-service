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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "30px 20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ marginBottom: "30px", fontSize: "22px" }}>Menu</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Dashboard", "Products", "Orders", "Profile", "Settings", "Logout"].map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #333",
                  cursor: "pointer"
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "50px 40px" }}>
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
            marginBottom: "25px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
        />

        {/* Search Results */}
        <div>
          {searchTerm && results.length > 0 && (
            <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
              {results.map((item, index) => (
                <li key={index} style={{ padding: "6px 0" }}>{item}</li>
              ))}
            </ul>
          )}

          {searchTerm && results.length === 0 && (
            <p style={{ color: "#888" }}>No products found for "{searchTerm}".</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
