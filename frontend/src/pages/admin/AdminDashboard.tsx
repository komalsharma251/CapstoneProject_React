import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      toast.error("Please login as admin.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.role !== "admin") {
      toast.error("Admin access only.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Admin Panel</span>
        <h1 style={title}>Shahizewer Dashboard</h1>
        <p style={subtitle}>
          Manage products, orders, reviews, users, and customer messages from one place.
        </p>
      </section>

      <section style={grid}>
        <Link to="/admin/orders" style={card}>
          <div style={icon}>📦</div>
          <h2>Orders</h2>
          <p>View and manage customer orders.</p>
        </Link>

        <Link to="/admin/products" style={card}>
          <div style={icon}>💎</div>
          <h2>Products</h2>
          <p>Manage jewellery products and pricing.</p>
        </Link>

        <Link to="/admin/messages" style={card}>
          <div style={icon}>✉️</div>
          <h2>Messages</h2>
          <p>Read customer contact form submissions.</p>
        </Link>

        <Link to="/admin/reviews" style={card}>
          <div style={icon}>⭐</div>
          <h2>Reviews</h2>
          <p>Monitor product reviews and feedback.</p>
        </Link>

        <Link to="/admin/users" style={card}>
          <div style={icon}>👥</div>
          <h2>Users</h2>
          <p>View registered customers and admins.</p>
        </Link>
      </section>
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
  padding: "54px 30px",
  borderRadius: "26px",
  textAlign: "center",
  marginBottom: "34px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.16)",
};

const smallLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontSize: "13px",
};

const title: React.CSSProperties = {
  fontSize: "44px",
  margin: "14px 0",
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,0.75)",
  maxWidth: "720px",
  margin: "0 auto",
  lineHeight: "1.7",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "22px",
};

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "26px",
  textDecoration: "none",
  color: "#111",
  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
};

const icon: React.CSSProperties = {
  fontSize: "38px",
  marginBottom: "12px",
};

export default AdminDashboard;