import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

const IMAGE_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone";

type Product = {
  product_id: number;
  product_name: string;
  price: number | string | null;
  image_url?: string | null;
};

type Review = {
  review_id: number;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/products/get.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DETAIL:", data);
        setProduct(data);
      })
      .catch((err) => console.error(err));

    fetch(`${API_BASE}/reviews/list.php?product_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div style={loadingWrapper}>
        <p>Loading product details...</p>
      </div>
    );
  }

  const imageSrc = product.image_url
    ? `${IMAGE_BASE}/${String(product.image_url).replace(/^\/+/, "")}`
    : "/default-product.png";

  const handleAddToCart = () => {
    addToCart({
      product_id: product.product_id,
      product_name: product.product_name,
      price: Number(product.price || 0),
      image_url: product.image_url,
      quantity: 1,
    });

    toast.success("Added to cart 🛒");
  };

  const handleSubmitReview = async () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      toast.error("Please login to submit review.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write your review.");
      return;
    }

    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(`${API_BASE}/reviews/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.product_id,
          user_id: user.user_id,
          customer_name: user.full_name,
          rating,
          review_text: reviewText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Review submitted!");

        setReviews((prev) => [
          {
            review_id: Date.now(),
            customer_name: user.full_name,
            rating,
            review_text: reviewText,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);

        setReviewText("");
        setRating(5);
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
        reviews.length
      : 0;

  return (
    <div style={pageWrapper}>
      <div style={breadcrumbWrapper}>
        <Link to="/" style={breadcrumbLink}>
          Home
        </Link>
        <span style={{ color: "#999" }}>/</span>
        <Link to="/shop" style={breadcrumbLink}>
          Shop
        </Link>
        <span style={{ color: "#999" }}>/</span>
        <span style={{ color: "#555" }}>{product.product_name}</span>
      </div>

      <section style={productCard}>
        <div style={imageSection}>
          <div style={imageBadge}>Premium Collection</div>

          <img
            src={imageSrc}
            alt={product.product_name}
            style={productImage}
            onError={(e) => {
              e.currentTarget.src = "/default-product.png";
            }}
          />
        </div>

        <div style={detailSection}>
          <span style={categoryLabel}>SHAHIZEWER JEWELLERY</span>

          <h1 style={productTitle}>{product.product_name}</h1>

          {reviews.length > 0 && (
            <p style={ratingLine}>
              ⭐ {averageRating.toFixed(1)} / 5 · {reviews.length} reviews
            </p>
          )}

          <p style={productPrice}>${Number(product.price || 0).toFixed(2)}</p>

          <p style={productDescription}>
            A premium handcrafted jewellery piece designed for weddings,
            traditional occasions, and elegant everyday styling. Carefully
            selected to bring a luxury Indian jewellery experience to Canada.
          </p>

          <div style={benefitGrid}>
            <div style={benefitBox}>🚚 Free Canada Shipping</div>
            <div style={benefitBox}>💎 Premium Finish</div>
            <div style={benefitBox}>🎁 Gift Ready</div>
            <div style={benefitBox}>🔒 Secure Checkout</div>
          </div>

          <div style={buttonRow}>
            <button onClick={handleAddToCart} style={addCartButton}>
              Add to Cart
            </button>

            <Link to="/cart" style={viewCartButton}>
              View Cart
            </Link>
          </div>

          <div style={infoBox}>
            <h3 style={{ marginTop: 0 }}>Product Care</h3>
            <p style={{ marginBottom: 0 }}>
              Keep away from water, perfumes, and harsh chemicals. Store in a
              dry jewellery box after use.
            </p>
          </div>
        </div>
      </section>

      <section style={reviewSection}>
        <div style={reviewHeader}>
          <div>
            <span style={categoryLabel}>Customer Feedback</span>
            <h2 style={{ margin: "8px 0 0" }}>Customer Reviews</h2>
          </div>

          <span style={{ color: "#666" }}>{reviews.length} Reviews</span>
        </div>

        <div style={reviewForm}>
          <h3 style={{ marginTop: 0 }}>Write a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={reviewInput}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            placeholder="Share your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{
              ...reviewInput,
              minHeight: "120px",
              resize: "vertical",
            }}
          />

          <button onClick={handleSubmitReview} style={submitReviewBtn}>
            Submit Review
          </button>
        </div>

        <div style={{ marginTop: "30px", display: "grid", gap: "18px" }}>
          {reviews.length === 0 ? (
            <div style={emptyReviewBox}>
              <h3 style={{ marginTop: 0 }}>No reviews yet</h3>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Be the first to review this jewellery piece.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.review_id} style={reviewCard}>
                <div style={reviewTop}>
                  <div>
                    <strong>{review.customer_name}</strong>

                    <div style={{ color: "#BFA56A", marginTop: "6px" }}>
                      {"⭐".repeat(Number(review.rating))}
                    </div>
                  </div>

                  <span style={{ color: "#777", fontSize: "13px" }}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p style={{ color: "#555", lineHeight: "1.8", marginBottom: 0 }}>
                  {review.review_text}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const breadcrumbWrapper: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "24px",
  fontSize: "14px",
};

const breadcrumbLink: React.CSSProperties = {
  color: "#BFA56A",
  textDecoration: "none",
  fontWeight: "600",
};

const productCard: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "45px",
  background: "#fff",
  borderRadius: "24px",
  padding: "30px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
  border: "1px solid #eee",
};

const imageSection: React.CSSProperties = {
  position: "relative",
  background: "#f7f3ec",
  borderRadius: "20px",
  padding: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "520px",
};

const imageBadge: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "#000",
  color: "#BFA56A",
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "bold",
};

const productImage: React.CSSProperties = {
  width: "100%",
  height: "470px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const detailSection: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const categoryLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  marginBottom: "12px",
};

const productTitle: React.CSSProperties = {
  fontSize: "42px",
  lineHeight: "1.15",
  margin: "0 0 14px",
  color: "#111",
};

const ratingLine: React.CSSProperties = {
  color: "#555",
  fontWeight: "600",
  margin: "0 0 14px",
};

const productPrice: React.CSSProperties = {
  color: "#BFA56A",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const productDescription: React.CSSProperties = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "1.8",
  marginBottom: "24px",
};

const benefitGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "24px",
};

const benefitBox: React.CSSProperties = {
  background: "#faf7f0",
  border: "1px solid #eee1c8",
  padding: "12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#333",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "28px",
};

const addCartButton: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  border: "none",
  padding: "15px 28px",
  borderRadius: "999px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

const viewCartButton: React.CSSProperties = {
  background: "#BFA56A",
  color: "#000",
  border: "none",
  padding: "15px 28px",
  borderRadius: "999px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  textDecoration: "none",
};

const infoBox: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  padding: "20px",
  borderRadius: "16px",
  lineHeight: "1.6",
};

const reviewSection: React.CSSProperties = {
  marginTop: "50px",
  background: "#fff",
  padding: "30px",
  borderRadius: "24px",
  border: "1px solid #eee",
  boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
};

const reviewHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  flexWrap: "wrap",
  gap: "10px",
};

const reviewForm: React.CSSProperties = {
  display: "grid",
  gap: "14px",
};

const reviewInput: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
};

const submitReviewBtn: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  border: "none",
  padding: "15px",
  borderRadius: "999px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
};

const reviewCard: React.CSSProperties = {
  border: "1px solid #eee",
  borderRadius: "16px",
  padding: "20px",
  background: "#fafafa",
};

const reviewTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  marginBottom: "12px",
  gap: "12px",
};

const emptyReviewBox: React.CSSProperties = {
  border: "1px dashed #ddd",
  borderRadius: "16px",
  padding: "24px",
  background: "#fafafa",
  textAlign: "center",
};

const loadingWrapper: React.CSSProperties = {
  padding: "80px 20px",
  textAlign: "center",
};

export default ProductDetail;