import React, { useState, useEffect } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("http://localhost:8080/categories"),
          fetch("http://localhost:8080/products")
        ]);

        const productData = await prodRes.json();
        const categoryData = await catRes.json();

        setProducts(productData);
        setCategories(["All", ...categoryData.filter(c => c !== "All")]);
        setResults(productData);  // initialize results
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

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
    // You can add routing here if needed
  };

  const displayedProducts =
    (searchTerm || activeCategory !== "All") && results.length > 0
      ? results
      : (searchTerm || activeCategory !== "All") && results.length === 0
      ? []
      : products;

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", margin: 0, padding: 0, fontFamily: "Segoe UI, sans-serif", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: menuOpen ? "240px" : "80px", backgroundColor: "#1e1e2f", color: "#fff", padding: "20px", transition: "width 0.3s ease", display: "flex", flexDirection: "column" }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", color: "#fff", border: "none", cursor: "pointer", fontSize: "20px", marginBottom: "20px", textAlign: "left" }}>
          {menuOpen ? "☰ Close" : "☰ Menu"}
        </button>
        {menuOpen && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map((item, index) => (
                <li key={index} style={{ padding: "12px 0", borderBottom: "1px solid #333", cursor: "pointer" }}>
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "50px 40px", overflowY: "auto", backgroundColor: "#f8f9fa" }}>
        <h1 style={{ marginBottom: "10px", fontSize: "32px" }}>🏠 Home Page</h1>
        <p style={{ marginBottom: "30px", fontSize: "16px" }}>Welcome! You are now logged in.</p>

        {/* Search Bar */}
        <input type="text" placeholder="🔍 Search products..." value={searchTerm} onChange={handleSearch} style={{ padding: "12px 18px", width: "100%", maxWidth: "400px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }} />

        {/* Product Categories */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleCategoryClick(category)} style={{ padding: "10px 16px", backgroundColor: activeCategory === category ? "#0056b3" : "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
          {displayedProducts.map((product, index) => (
            <div key={index} onClick={() => handleProductClick(product)} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "12px", cursor: "pointer", textAlign: "center", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
              <strong style={{ fontSize: "16px" }}>{product.name}</strong>
              <p style={{ color: "#666", fontSize: "14px" }}>{product.category}</p>
            </div>
          ))}
        </div>

        {/* No results */}
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
