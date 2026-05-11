import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

type AdminReview = {
  review_id: number;
  product_id: number;
  product_name: string;
  user_id: number | null;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = () => {
    fetch(`${API_BASE}/admin/reviews/list.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.reviews);
        } else {
          toast.error(data.message || "Failed to load reviews.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong loading reviews.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || JSON.parse(savedUser).role !== "admin") {
      toast.error("Admin access only.");
      window.location.href = "/";
      return;
    }

    loadReviews();
  }, []);

  const deleteReview = async (reviewId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE}/admin/reviews/delete.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review_id: reviewId,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Review deleted.");

        setReviews((prev) =>
          prev.filter((review) => review.review_id !== reviewId)
        );
      } else {
        toast.error(result.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong deleting review.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading reviews...</h2>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Admin Reviews</span>

        <h1 style={title}>Reviews Management</h1>

        <p style={subtitle}>
          Monitor customer product reviews and remove inappropriate feedback.
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link to="/admin" style={dashboardBtn}>
            ← Back to Dashboard
          </Link>
        </div>
      </section>

      <div style={summaryGrid}>
        <div style={summaryCard}>
          <span>Total Reviews</span>
          <strong>{reviews.length}</strong>
        </div>

        <div style={summaryCard}>
          <span>5-Star Reviews</span>
          <strong>
            {reviews.filter((r) => Number(r.rating) === 5).length}
          </strong>
        </div>

        <div style={summaryCard}>
          <span>Low Reviews</span>
          <strong>
            {reviews.filter((r) => Number(r.rating) <= 2).length}
          </strong>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div style={emptyBox}>
          <h2>No reviews found</h2>
          <p>No product reviews have been submitted yet.</p>
        </div>
      ) : (
        <div style={reviewGrid}>
          {reviews.map((review) => (
            <div key={review.review_id} style={reviewCard}>
              <div style={reviewTop}>
                <div>
                  <h2 style={{ margin: 0 }}>
                    {review.product_name || `Product #${review.product_id}`}
                  </h2>

                  <p style={mutedText}>
                    Review #{review.review_id} ·{" "}
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                </div>

                <span style={ratingBadge}>
                  {"⭐".repeat(Number(review.rating))}
                </span>
              </div>

              <div style={infoGrid}>
                <div>
                  <strong>Customer</strong>

                  <p style={infoText}>{review.customer_name}</p>
                </div>

                <div>
                  <strong>Product ID</strong>

                  <p style={infoText}>{review.product_id}</p>
                </div>

                <div>
                  <strong>User ID</strong>

                  <p style={infoText}>
                    {review.user_id || "Guest/Unknown"}
                  </p>
                </div>
              </div>

              <div style={reviewBox}>
                <strong>Review</strong>

                <p style={{ color: "#555", lineHeight: "1.7", marginBottom: 0 }}>
                  {review.review_text}
                </p>
              </div>

              <div style={actionRow}>
                <button
                  onClick={() => deleteReview(review.review_id)}
                  style={deleteBtn}
                >
                  Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const hero: React.CSSProperties = {
  background: "linear-gradient(135deg, #000 0%, #171717 60%, #3b2f14 100%)",
  color: "#fff",
  padding: "48px 28px",
  borderRadius: "24px",
  textAlign: "center",
  marginBottom: "28px",
};

const smallLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontSize: "13px",
};

const title: React.CSSProperties = {
  fontSize: "42px",
  margin: "12px 0",
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,0.75)",
  margin: 0,
};

const dashboardBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#BFA56A",
  color: "#000",
  padding: "12px 20px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const summaryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const summaryCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const reviewGrid: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const reviewCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const reviewTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const mutedText: React.CSSProperties = {
  color: "#666",
  margin: "6px 0 0",
  fontSize: "14px",
};

const ratingBadge: React.CSSProperties = {
  background: "#fffbeb",
  color: "#92400e",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "13px",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  marginBottom: "18px",
};

const infoText: React.CSSProperties = {
  color: "#666",
  lineHeight: "1.6",
  marginBottom: 0,
};

const reviewBox: React.CSSProperties = {
  background: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "16px",
  padding: "18px",
};

const actionRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const deleteBtn: React.CSSProperties = {
  background: "#fff1f1",
  color: "#b91c1c",
  border: "1px solid #fecaca",
  padding: "11px 18px",
  borderRadius: "999px",
  fontWeight: "bold",
  cursor: "pointer",
};

const emptyBox: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "40px",
  textAlign: "center",
};

export default AdminReviewsPage;