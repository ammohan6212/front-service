import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories and products
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get("/back/categories");
        const productRes = await axios.get("/back/products");

        // Deduplicate categories by name
        const categoryMap = {};
        categoryRes.data.forEach((cat) => {
          if (!categoryMap[cat.Name]) {
            categoryMap[cat.Name] = cat;
          }
        });

        const uniqueCategories = ["All", ...Object.keys(categoryMap)];

        setCategories(uniqueCategories);
        setProducts(productRes.data);
        setResults(productRes.data); // Initially display all
      } catch (error) {
        console.error("Error fetching data", error);
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
      filtered = filtered.filter((item) => item.category?.name === category);
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

  const displayedProducts =
    (searchTerm || activeCategory !== "All") && results.length > 0
      ? results
      : (searchTerm || activeCategory !== "All") && results.length === 0
      ? []
      : products;

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
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <strong>{product.name}</strong>
              <p style={{ color: "#666" }}>{product.category}</p>
            </div>
          ))}
        </div>

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
