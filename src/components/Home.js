import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Added loading state

  const navigate = useNavigate();

  useEffect(() => {
    fetch("product/get-products")
      .then(res => res.json())
      .then(data => {
        const fetchedProducts = data.products || [];
        setProducts(fetchedProducts);
        setResults(fetchedProducts);

        const uniqueCategories = [...new Set(fetchedProducts.map(p => p.category))];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        setLoading(false); // <-- Stop loading once fetch completes
      });
  }, []);

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
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
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
    (searchTerm || activeCategory !== "All") ? results : products;

  return (
    <>
      {/* Ocean Background */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 1,
        background: "linear-gradient(to bottom, #00aaff, #004488)"
      }}>
        <div style={{ ...waveStyle(0.4, "wave 20s linear infinite") }} />
        <div style={{ ...waveStyle(0.3, "wave 30s linear infinite reverse") }} />
        <div style={{ ...waveStyle(0.2, "wave 40s linear infinite") }} />
        <style>{`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
          }
        `}</style>
      </div>

      {/* App Container */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", width: "100vw", height: "100vh"
      }}>
        {/* Sidebar */}
        <aside style={{
          width: menuOpen ? "240px" : "80px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          transition: "width 0.3s ease"
        }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", color: "#fff", border: "none",
            fontSize: "20px", marginBottom: "20px"
          }}>
            {menuOpen ? "☰ Close" : "☰ Menu"}
          </button>
          {menuOpen && (
            <nav>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map((item, index) => (
                  <li key={index} onClick={() => handleMenuClick(item)} style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #333",
                    cursor: "pointer"
                  }}>
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
          backgroundColor: "#f8f9fa"
        }}>
          <h1>🏠 Home Page</h1>
          <p style={{ marginBottom: "30px" }}>Welcome! You are now logged in.</p>

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "12px 18px",
              width: "100%", maxWidth: "600px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px"
            }}
          />

          {/* Dynamic Categories */}
          <div style={{
            display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px"
          }}>
            {categories.map((cat, idx) => (
              <button key={idx} onClick={() => handleCategoryClick(cat)} style={{
                padding: "10px 16px",
                backgroundColor: activeCategory === cat ? "#0056b3" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Loading or Products */}
          {loading ? (
            <p style={{ fontSize: "20px", textAlign: "center", marginTop: "40px" }}>
              ⏳ Loading products...
            </p>
          ) : (
            <>
              {/* Product Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px"
              }}>
                {displayedProducts.map((product, index) => (
                  <div key={index} onClick={() => handleProductClick(product)} style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "12px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                    <img
                      src={product.image_url || "https://via.placeholder.com/150"}
                      alt={product.name}
                      style={{
                        width: "100%", height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px"
                      }}
                    />
                    <strong>{product.name}</strong>
                  </div>
                ))}
              </div>

              {displayedProducts.length === 0 && (
                <p style={{ marginTop: "20px", color: "#888", fontSize: "18px", textAlign: "center" }}>
                  😕 No products found for <strong>"{searchTerm}"</strong> in <strong>"{activeCategory}"</strong>.
                </p>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

// Helper for wave animation
const waveStyle = (opacity, animation) => ({
  position: "absolute", top: 0, left: 0,
  width: "300%", height: "300%",
  background: "url('https://svgshare.com/i/uR5.svg') repeat-x",
  backgroundSize: "cover",
  opacity,
  animation
});

export default Home;
