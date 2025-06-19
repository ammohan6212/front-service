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
    <>
      {/* Ocean Background */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        overflow: "hidden",
        zIndex: 1,
        background: "linear-gradient(to bottom, #00aaff, #004488)"
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "300%", height: "300%",
          background: "url('https://svgshare.com/i/uR5.svg') repeat-x",
          backgroundSize: "cover",
          opacity: 0.4,
          animation: "wave 20s linear infinite"
        }} />
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "300%", height: "300%",
          background: "url('https://svgshare.com/i/uR5.svg') repeat-x",
          backgroundSize: "cover",
          opacity: 0.3,
          animation: "wave 30s linear infinite reverse"
        }} />
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "300%", height: "300%",
          background: "url('https://svgshare.com/i/uR5.svg') repeat-x",
          backgroundSize: "cover",
          opacity: 0.2,
          animation: "wave 40s linear infinite"
        }} />
        {/* Inline animation style */}
        <style>{`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          body {
            margin: 0;
            overflow-x: hidden;
          }
        `}</style>
      </div>

      {/* Layout */}
      <div style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        position: "relative",
        zIndex: 10,
        boxSizing: "border-box"
      }}>
        {/* Sidebar */}
        <aside style={{
          width: menuOpen ? "240px" : "80px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              marginBottom: "20px",
              textAlign: "left"
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
                      cursor: "pointer"
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
        <main style={{
          flex: 1,
          padding: "40px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
          boxSizing: "border-box",
          minWidth: 0,
          maxWidth: "100%",
          width: "100vw",
        }}>
          <h1 style={{ fontSize: "32px" }}>🏠 Home Page</h1>
          <p style={{ marginBottom: "30px", fontSize: "16px" }}>Welcome! You are now logged in.</p>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "12px 18px",
              width: "100%",
              maxWidth: "600px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px"
            }}
          />

          {/* Categories */}
          <div style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}>
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
                  fontSize: "14px"
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px"
          }}>
            {displayedProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => handleProductClick(product)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "box-shadow 0.2s"
                }}
              >
                <img
                  src={product.image}
                  alt={`Product: ${product.name}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px"
                  }}
                />
                <strong style={{ fontSize: "16px" }}>{product.name}</strong>
                <p style={{ color: "#666", fontSize: "14px" }}>{product.category}</p>
              </div>
            ))}
          </div>

          {/* No Results */}
          {displayedProducts.length === 0 && (
            <p style={{
              marginTop: "20px",
              color: "#888",
              fontSize: "18px",
              textAlign: "center"
            }}>
              😕 No products found for <strong>"{searchTerm}"</strong> in <strong>"{activeCategory}"</strong>.
            </p>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
