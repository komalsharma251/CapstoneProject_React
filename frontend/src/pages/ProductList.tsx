import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isInWishlist, toggleWishlist } from "../utils/wishlist";

type Product = {
  product_id: number;
  product_name: string;
  price: number | string;
  image_url?: string | null;
};

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [sortOption, setSortOption] = useState("default");
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/products/list.php")
      .then((res) => res.json())
      .then((data: Product[]) => {
        console.log("API DATA:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);

      if (sortOption === "low-high") return priceA - priceB;
      if (sortOption === "high-low") return priceB - priceA;

      return 0;
    });

  return (
    <div style={{ padding: "50px 20px", fontFamily: "Arial, sans-serif" }}>
      <section style={{ textAlign: "center", marginBottom: "35px" }}>
        <span
          style={{
            color: "#BFA56A",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontSize: "13px",
          }}
        >
          Shahizewer Collection
        </span>

        <h1 style={{ color: "#111", fontSize: "42px", margin: "12px 0" }}>
          Premium Indian Jewellery
        </h1>

        <p style={{ color: "#666" }}>
          Explore luxury jewellery pieces for weddings, gifting, and special
          occasions.
        </p>
      </section>

      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto 30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search jewellery by name..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            fontSize: "15px",
            background: "#fff",
          }}
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <p
        style={{
          maxWidth: "1120px",
          margin: "0 auto 20px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "18px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2>No products found</h2>
          <p style={{ color: "#666" }}>
            Try searching with a different jewellery name.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          {filteredProducts.map((p) => {
            const liked = isInWishlist(p.product_id);

            return (
              <div
                key={p.product_id}
                onClick={() => navigate(`/product/${p.product_id}`)}
                style={{
                  position: "relative",
                  border: "1px solid #eee",
                  borderRadius: "18px",
                  padding: "16px",
                  background: "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    toggleWishlist({
                      product_id: p.product_id,
                      product_name: p.product_name,
                      price: Number(p.price),
                      image_url: p.image_url,
                    });

                    setWishlistRefresh(wishlistRefresh + 1);
                  }}
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "#fff",
                    color: liked ? "#dc2626" : "#111",
                    border: "1px solid #eee",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    zIndex: 2,
                  }}
                  aria-label="Toggle wishlist"
                >
                  {liked ? "♥" : "♡"}
                </button>

                <img
                  src={`http://localhost/WEBSITES/shahijewer_website/${String(
                    p.image_url || ""
                  ).replace(/^\/+/, "")}`}
                  alt={p.product_name}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    marginBottom: "14px",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "http://localhost/WEBSITES/shahijewer_website/assets/images/default.png";
                  }}
                />

                <h3 style={{ margin: "10px 0", color: "#111" }}>
                  {p.product_name}
                </h3>

                <p
                  style={{
                    color: "#BFA56A",
                    fontWeight: "bold",
                    fontSize: "20px",
                    margin: "8px 0 16px",
                  }}
                >
                  ${Number(p.price).toFixed(2)}
                </p>

                <button
                  style={{
                    background: "#000",
                    color: "#BFA56A",
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;