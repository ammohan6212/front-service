import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Renamed from 'results' for clarity
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const navigate = useNavigate();

  // In a real application, this data would come from an API call (e.g., to your product-service)
  const allProducts = [
    { id: 1, name: "Apple iPhone 15 Pro", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=iPhone15", price: 1099 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=S24+Ultra", price: 1299 },
    { id: 3, name: "Google Pixel 8 Pro", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=Pixel8", price: 999 },
    { id: 4, name: "Sony WH-1000XM5 Headphones", category: "Electronics", image: "https://via.placeholder.com/150x150?text=XM5+Headphones", price: 349 },
    { id: 5, name: "Dell XPS 15 Laptop", category: "Electronics", image: "https://via.placeholder.com/150x150?text=Dell+XPS", price: 1899 },
    { id: 6, name: "Classic Leather Jacket", category: "Fashion", image: "https://via.placeholder.com/150x150?text=Leather+Jacket", price: 299 },
    { id: 7, name: "Apple Watch Series 9", category: "Fashion", image: "https://via.placeholder.com/150x150?text=Apple+Watch", price: 399 },
    { id: 8, name: "Dyson V11 Cordless Vacuum Cleaner", category: "Home Gadgets", image: "https://via.placeholder.com/150x150?text=Dyson+Vacuum", price: 599 },
    { id: 9, name: "Philips Hue Smart Bulb Kit", category: "Home Gadgets", image: "https://via.placeholder.com/150x150?text=Smart+Bulb", price: 149 },
    // Adding a few more to help fill the grid visually
    { id: 10, name: "Amazon Echo Dot (5th Gen)", category: "Home Gadgets", image: "https://via.placeholder.com/150x150?text=Echo+Dot", price: 49 },
    { id: 11, name: "Logitech MX Master 3S Mouse", category: "Electronics", image: "https://via.placeholder.com/150x150?text=MX+Master", price: 99 },
    { id: 12, name: "Nike Air Force 1 Sneakers", category: "Fashion", image: "https://via.placeholder.com/150x150?text=Nike+AF1", price: 120 },
    { id: 13, name: "iPad Air M2", category: "Electronics", image: "https://via.placeholder.com/150x150?text=iPad+Air", price: 599 },
    { id: 14, name: "OnePlus 12", category: "Mobiles", image: "https://via.placeholder.com/150x150?text=OnePlus12", price: 799 },
    { id: 15, name: "Samsung 4K Smart TV", category: "Electronics", image: "https://via.placeholder.com/150x150?text=4K+TV", price: 700 },
  ];

  const categories = ["All", "Mobiles", "Fashion", "Home Gadgets", "Electronics"];

  // Effect to filter products whenever searchTerm, activeCategory, or allProducts changes
  useEffect(() => {
    let currentFiltered = allProducts;

    if (activeCategory !== "All") {
      currentFiltered = currentFiltered.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim() !== "") {
      currentFiltered = currentFiltered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(currentFiltered);
  }, [searchTerm, activeCategory, allProducts]); // Depend on these states

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Filtering now handled by useEffect
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Filtering now handled by useEffect
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`); // Example: navigate to a product detail page
    // alert(`You clicked on ${product.name}`); // Changed to navigation
  };

  const handleMenuClick = (item) => {
    switch (item) {
      case "Cart":
        navigate("/cart");
        break;
      case "Orders":
        navigate("/orders"); // Consistent naming for route
        break;
      case "Products":
        // If "Products" menu item should show all products, reset search/category
        setSearchTerm("");
        setActiveCategory("All");
        navigate("/"); // Navigate to home
        break;
      case "Dashboard":
        navigate("/dashboard"); // Assuming a dashboard route
        break;
      case "Profile":
        navigate("/profile"); // Assuming a profile route
        break;
      case "Settings":
        navigate("/settings"); // Assuming a settings route
        break;
      case "Logout":
        alert("Logging out..."); // Replace with actual logout logic
        navigate("/login"); // Navigate to login page after logout
        break;
      default:
        alert(`Action for ${item} not implemented.`);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
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
          boxSizing: "border-box",
          flexShrink: 0, // Prevent sidebar from shrinking
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
            padding: "0", // Remove default button padding
            textAlign: "left",
          }}
        >
          {menuOpen ? "☰ Close" : "☰ Menu"}
        </button>
        {menuOpen && (
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Dashboard", "Products", "Orders", "Cart", "Profile", "Settings", "Logout"].map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #333",
                    cursor: "pointer",
                    fontSize: "16px", // Increased font size for readability
                    display: "flex", // Ensure padding applies correctly
                    alignItems: "center",
                    gap: "10px", // Space between icon and text if you add icons
                  }}
                >
                  {/* You can add icons here */}
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
          padding: "40px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "15px" }}>🏠 Home Page</h1>
        <p style={{ marginBottom: "30px", fontSize: "16px" }}>
          Welcome! Explore our wide range of products.
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
            maxWidth: "600px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />

        {/* Categories */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
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
                transition: "background-color 0.2s ease", // Smooth transition
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => ( // Use filteredProducts here
              <div
                key={product.id} // Use unique ID for key
                onClick={() => handleProductClick(product)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease", // Hover effect
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <strong style={{ fontSize: "16px", display: "block", marginBottom: "5px" }}>{product.name}</strong>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>{product.category}</p>
                <p style={{ fontWeight: "bold", color: "#333", fontSize: "15px" }}>${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#555" }}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>😔 No Products Found</p>
              <p style={{ fontSize: "16px", marginTop: "10px" }}>
                Adjust your search or category filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;