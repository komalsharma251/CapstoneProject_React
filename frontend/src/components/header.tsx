import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  // Stores total cart items count
  const [cartCount, setCartCount] = useState(0);

  // Stores total wishlist items count
  const [wishlistCount, setWishlistCount] = useState(0);

  // Stores search input value from header search box
  const [headerSearch, setHeaderSearch] = useState("");

  // Stores logged-in user data from localStorage
  const [user, setUser] = useState<any>(null);

  // Used to redirect user to another page
  const navigate = useNavigate();

  // Updates cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add all product quantities together
    const count = cart.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    );

    setCartCount(count);
  };

  // Updates wishlist count from localStorage
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistCount(wishlist.length);
  };

  // Handles search form submit from header
  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const searchValue = headerSearch.trim();

    // If user typed something, send search query to shop page
    if (searchValue) {
      navigate(`/shop?search=${encodeURIComponent(searchValue)}`);
    } else {
      navigate("/shop");
    }
  };

  // Logs out user and updates header instantly
  const handleLogout = () => {
    localStorage.removeItem("user");

    // Remove user from state
    setUser(null);

    // Notify other components that user data changed
    window.dispatchEvent(new Event("userUpdated"));

    navigate("/");
  };

  useEffect(() => {
    // Load cart and wishlist count when header first renders
    updateCartCount();
    updateWishlistCount();

    // Load logged-in user from localStorage
    const updateUser = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    updateUser();

    // Listen for custom events from other components
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("userUpdated", updateUser);

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div style={topBar}>
        <div style={topBarInner}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span>🚚 Free Shipping in Canada</span>
            <span>💎 Premium Indian Jewellery</span>
            <span>⏰ Book Appointment</span>
          </div>

          <div>📞 +1 647 123 4567</div>
        </div>
      </div>

      {/* Main sticky header */}
      <header style={header}>
        <div style={headerInner}>
          {/* Website logo */}
          <Link to="/" style={logo}>
            SHAHIZEWER
          </Link>

          {/* Main navigation links */}
          <nav style={nav}>
            <Link to="/" style={navStyle}>Home</Link>
            <Link to="/shop" style={navStyle}>Shop</Link>
            <Link to="/about" style={navStyle}>About</Link>
            <Link to="/gallery" style={navStyle}>Gallery</Link>
            <Link to="/contact" style={navStyle}>Contact</Link>
          </nav>

          {/* Header action buttons */}
          <div style={actions}>
            {/* Search form */}
            <form onSubmit={handleHeaderSearch} style={searchForm}>
              <input
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Search..."
                style={searchInput}
              />

              <button type="submit" style={searchButton}>
                🔍
              </button>
            </form>

            {/* Wishlist icon with count badge */}
            <Link to="/wishlist" style={iconWrap}>
              ♡
              {wishlistCount > 0 && (
                <span style={badgeStyle}>{wishlistCount}</span>
              )}
            </Link>

            {/* Cart icon with count badge */}
            <Link to="/cart" style={iconWrap}>
              🛒
              {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
            </Link>

            {/* Show user menu if logged in, otherwise show login icon */}
            {user ? (
              <div style={userMenu}>
                <span style={userName}>Hi, {user.full_name}</span>

                <Link to="/my-orders" style={myOrdersBtn}>
                  My Orders
                </Link>

                <button onClick={handleLogout} style={logoutBtn}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" style={iconWrap}>
                👤
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

/* ================= HEADER STYLES ================= */

const topBar: React.CSSProperties = {
  background: "#111",
  color: "white",
  padding: "8px 20px",
  fontSize: "14px",
};

const topBarInner: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
};

const header: React.CSSProperties = {
  background: "#000",
  color: "white",
  padding: "18px 20px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const headerInner: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
  flexWrap: "wrap",
};

const logo: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  fontSize: "28px",
  letterSpacing: "1px",
  textDecoration: "none",
};

const nav: React.CSSProperties = {
  display: "flex",
  gap: "26px",
  alignItems: "center",
  flexWrap: "wrap",
};

const navStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
  color: "#BFA56A",
  fontSize: "20px",
  flexWrap: "wrap",
};

const searchForm: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  background: "#111",
  border: "1px solid rgba(191,165,106,0.35)",
  borderRadius: "999px",
  padding: "5px 8px",
};

const searchInput: React.CSSProperties = {
  width: "120px",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  fontSize: "13px",
};

const searchButton: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#BFA56A",
  cursor: "pointer",
};

const iconWrap: React.CSSProperties = {
  color: "#BFA56A",
  textDecoration: "none",
  position: "relative",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-10px",
  right: "-14px",
  background: "#BFA56A",
  color: "#000",
  fontSize: "12px",
  fontWeight: "bold",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const userMenu: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const userName: React.CSSProperties = {
  color: "#BFA56A",
  fontSize: "14px",
  fontWeight: "600",
};

const myOrdersBtn: React.CSSProperties = {
  color: "#BFA56A",
  textDecoration: "none",
  border: "1px solid rgba(191,165,106,0.5)",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "500",
};

const logoutBtn: React.CSSProperties = {
  background: "transparent",
  color: "#BFA56A",
  border: "1px solid rgba(191,165,106,0.5)",
  padding: "6px 12px",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "13px",
};

export default Header;