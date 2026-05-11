import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

const IMAGE_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone";

function AdminAddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: "",
    price: "",
    image_url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || JSON.parse(savedUser).role !== "admin") {
      toast.error("Admin access only.");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.product_name || !form.price || !form.image_url) {
      toast.error("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/admin/products/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: form.product_name,
          price: Number(form.price),
          image_url: form.image_url,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product added successfully!");

        setForm({
          product_name: "",
          price: "",
          image_url: "",
        });

        navigate("/admin/products");
      } else {
        toast.error(result.message || "Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewSrc = form.image_url
    ? `${IMAGE_BASE}/${form.image_url.replace(/^\/+/, "")}`
    : "/default-product.png";

  return (
    <div style={pageWrapper}>
      <div style={topActions}>
        <Link to="/admin/products" style={backLink}>
          ← Back to Products
        </Link>

        <Link to="/admin" style={dashboardBtn}>
          ← Dashboard
        </Link>
      </div>

      <section style={hero}>
        <span style={smallLabel}>Admin Product</span>

        <h1 style={title}>Add New Product</h1>

        <p style={subtitle}>
          Add a new jewellery product to the Shahizewer shop.
        </p>
      </section>

      <div style={layout}>
        <form onSubmit={handleSubmit} style={formCard}>
          <label style={labelStyle}>Product Name</label>

          <input
            required
            placeholder="Example: Bridal Necklace Set"
            value={form.product_name}
            onChange={(e) =>
              setForm({ ...form, product_name: e.target.value })
            }
            style={inputStyle}
          />

          <label style={labelStyle}>Price</label>

          <input
            required
            type="number"
            step="0.01"
            placeholder="199.99"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={inputStyle}
          />

          <label style={labelStyle}>Image URL</label>

          <input
            required
            placeholder="assets/images/necklace4.png"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...submitBtn,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>

        <div style={previewCard}>
          <h2 style={{ marginTop: 0 }}>Preview</h2>

          <img
            src={previewSrc}
            alt="Product preview"
            style={previewImage}
            onError={(e) => {
              e.currentTarget.src = "/default-product.png";
            }}
          />

          <h3>{form.product_name || "Product Name"}</h3>

          <p style={priceText}>
            ${form.price ? Number(form.price).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const topActions: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const backLink: React.CSSProperties = {
  color: "#BFA56A",
  textDecoration: "none",
  fontWeight: "bold",
};

const dashboardBtn: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  padding: "10px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const hero: React.CSSProperties = {
  background: "linear-gradient(135deg, #000 0%, #171717 60%, #3b2f14 100%)",
  color: "#fff",
  padding: "48px 28px",
  borderRadius: "24px",
  textAlign: "center",
  margin: "24px 0 28px",
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

const layout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 0.8fr",
  gap: "24px",
  alignItems: "start",
};

const formCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
  marginBottom: "18px",
};

const submitBtn: React.CSSProperties = {
  width: "100%",
  background: "#000",
  color: "#BFA56A",
  border: "none",
  padding: "15px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "16px",
};

const previewCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "24px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const previewImage: React.CSSProperties = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "14px",
};

const priceText: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  fontSize: "22px",
};

export default AdminAddProductPage;