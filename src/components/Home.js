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
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden"
    }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: menuOpen ? "220px" : "70px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "15px",
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
            fontSize: "22px",
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
                  onClick={() => handleMenuClick(item)}
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
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>🏠 Home Page</h1>
        <p style={{ marginBottom: "25px", fontSize: "16px" }}>
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
          }}
        />

        {/* Categories */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "25px"
        }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "10px 14px",
                backgroundColor: activeCategory === category ? "#0056b3" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "18px",
          flex: 1, // grow to fill available space
        }}>
          {displayedProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "8px",
                }}
              />
              <strong style={{ fontSize: "15px" }}>{product.name}</strong>
              <p style={{ color: "#666", fontSize: "13px" }}>{product.category}</p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayedProducts.length === 0 && (
          <p style={{ marginTop: "20px", color: "#888" }}>
            No products found for "{searchTerm}" in "{activeCategory}".
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
