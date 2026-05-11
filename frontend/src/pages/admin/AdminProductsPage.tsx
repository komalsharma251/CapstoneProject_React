import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

const IMAGE_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone";

type AdminProduct = {
  product_id: number;
  product_name: string;
  price: number | string;
  image_url?: string | null;
};

function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    fetch(`${API_BASE}/admin/products/list.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message || "Failed to load products.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong loading products.");
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

    loadProducts();
  }, []);

  const deleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}/admin/products/delete.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      const result = await response.json();
      console.log("DELETE RESULT:", result);

      if (result.success) {
        toast.success("Product deleted.");

        setProducts((prev) =>
          prev.filter((product) => product.product_id !== productId)
        );
      } else {
        toast.error(result.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong deleting product."
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Admin Products</span>

        <h1 style={title}>Products Management</h1>

        <p style={subtitle}>
          View jewellery products currently displayed on the Shahizewer shop.
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link to="/admin" style={dashboardBtn}>
            ← Back to Dashboard
          </Link>
        </div>
      </section>

      <div style={topActions}>
        <div style={summaryCard}>
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <Link to="/admin/products/add" style={addProductBtn}>
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div style={emptyBox}>
          <h2>No products found</h2>
          <p>No products are currently available in the database.</p>
        </div>
      ) : (
        <div style={productsGrid}>
          {products.map((product) => {
            const imageSrc = product.image_url
              ? `${IMAGE_BASE}/${String(product.image_url).replace(/^\/+/, "")}`
              : "/default-product.png";

            return (
              <div key={product.product_id} style={productCard}>
                <img
                  src={imageSrc}
                  alt={product.product_name}
                  style={productImage}
                  onError={(e) => {
                    e.currentTarget.src = "/default-product.png";
                  }}
                />

                <h3>{product.product_name}</h3>

                <p style={priceText}>${Number(product.price || 0).toFixed(2)}</p>

                <div style={actionsRow}>
                  <Link
                    to={`/admin/products/edit/${product.product_id}`}
                    style={editBtn}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.product_id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
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

const topActions: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  marginBottom: "28px",
  flexWrap: "wrap",
};

const summaryCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  minWidth: "240px",
  gap: "20px",
};

const addProductBtn: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  padding: "13px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
};

const emptyBox: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "40px",
  textAlign: "center",
  boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
};

const productsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "22px",
};

const productCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  textAlign: "center",
};

const productImage: React.CSSProperties = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "14px",
};

const priceText: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  fontSize: "20px",
};

const actionsRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const editBtn: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  border: "none",
  padding: "10px 16px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "bold",
  textDecoration: "none",
};

const deleteBtn: React.CSSProperties = {
  background: "#fff1f1",
  color: "#b91c1c",
  border: "1px solid #fecaca",
  padding: "10px 16px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AdminProductsPage;