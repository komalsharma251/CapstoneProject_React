
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { WishlistItem } from "../utils/wishlist";
import { getWishlist, toggleWishlist } from "../utils/wishlist";

function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const removeItem = (item: WishlistItem) => {
    const updated = toggleWishlist(item);
    setWishlist(updated);
  };

  // Empty state
  if (wishlist.length === 0) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "70px" }}>♡</div>

        <h1>Your Wishlist is Empty</h1>

        <p style={{ color: "#666" }}>
          Save your favourite jewellery pieces and view them here.
        </p>

        <Link
          to="/shop"
          style={{
            marginTop: "20px",
            display: "inline-block",
            background: "#000",
            color: "#BFA56A",
            padding: "12px 24px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 20px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>My Wishlist</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.product_id}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid #eee",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={`http://localhost/WEBSITES/shahijewer_website/${String(
                item.image_url || ""
              ).replace(/^\/+/, "")}`}
              alt={item.product_name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />

            <h3>{item.product_name}</h3>

            <p
              style={{
                color: "#BFA56A",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              ${item.price.toFixed(2)}
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => navigate(`/product/${item.product_id}`)}
                style={{
                  background: "#000",
                  color: "#BFA56A",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                View
              </button>

              <button
                onClick={() => removeItem(item)}
                style={{
                  background: "#fee2e2",
                  color: "#b91c1c",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
