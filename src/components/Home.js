import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [categoryRes, productRes] = await Promise.all([
          axios.get("/back/back/categories"),
          axios.get("/back//back/products"),
        ]);

        // Convert all category names to trimmed strings to ensure uniqueness
        const rawCategoryNames = categoryRes.data.map((cat) => String(cat.Name).trim()).filter((name) => isNaN(Number(name))); // ✅ Filter out numeric-only categories
        const uniqueCategories = ["All", ...new Set(rawCategoryNames)];

        setCategories(uniqueCategories);
        setProducts(productRes.data);
        setResults(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("❌ Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((item) => String(item.category).trim() === category);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setResults(filtered);
  };

  const handleProductClick = (product) => {
    alert(`You clicked on ${product.name}`);
  };

  const displayedProducts =
    searchTerm || activeCategory !== "All" ? results : products;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: menuOpen ? "240px" : "80px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          transition: "width 0.3s ease",
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
          }}
        >
          {menuOpen ? "☰ Close" : "☰ Menu"}
        </button>

        {menuOpen && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map(
                (item, index) => (
                  <li
                    key={index}
                    style={{ padding: "12px 0", borderBottom: "1px solid #333", cursor: "pointer" }}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "50px 40px", backgroundColor: "#f8f9fa", overflowY: "auto" }}>
        <h1>🏠 Home Page</h1>
        <p>Welcome! You are now logged in.</p>

        {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "12px 18px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        {/* Category Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
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
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            {/* Product Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "20px",
              }}
            >
              {displayedProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(product)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "12px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name || "Product Image"}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <strong>{product.name || "Unnamed Product"}</strong>
                  <p style={{ color: "#666" }}>{product.category || "Uncategorized"}</p>
                </div>
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <p style={{ marginTop: "20px", color: "#888" }}>
                No products found for "{searchTerm}" in "{activeCategory}".
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
