import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type AdminOrder = {
  order_id: number;
  user_id: number;
  full_name: string;
  email: string;
  order_date: string;
  status: string;
  total_amount: number | string;
  shipping_city: string;
  shipping_country: string;
};

function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    fetch(
      "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/admin/orders/list.php"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Failed to load orders.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong loading orders.");
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

    loadOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch(
        "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/admin/orders/update-status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderId,
            status,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Order status updated.");

        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId ? { ...order, status } : order
          )
        );
      } else {
        toast.error(result.message || "Status update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading admin orders...</h2>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Admin Orders</span>

        <h1 style={title}>Order Management</h1>

        <p style={subtitle}>
          View customer orders and update order status from one place.
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link to="/admin" style={dashboardBtn}>
            ← Back to Dashboard
          </Link>
        </div>
      </section>

      <div style={summaryGrid}>
        <div style={summaryCard}>
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div style={summaryCard}>
          <span>Processing</span>
          <strong>
            {orders.filter((o) => o.status === "processing").length}
          </strong>
        </div>

        <div style={summaryCard}>
          <span>Shipped</span>
          <strong>
            {orders.filter((o) => o.status === "shipped").length}
          </strong>
        </div>

        <div style={summaryCard}>
          <span>Delivered</span>
          <strong>
            {orders.filter((o) => o.status === "delivered").length}
          </strong>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={emptyBox}>
          <h2>No orders found</h2>
          <p>No customer orders have been placed yet.</p>
        </div>
      ) : (
        <div style={ordersList}>
          {orders.map((order) => (
            <div key={order.order_id} style={orderCard}>
              <div style={orderTop}>
                <div>
                  <h2 style={{ margin: 0 }}>Order #{order.order_id}</h2>

                  <p style={mutedText}>
                    {new Date(order.order_date).toLocaleString()}
                  </p>
                </div>

                <span style={getStatusStyle(order.status)}>
                  {order.status}
                </span>
              </div>

              <div style={orderGrid}>
                <div>
                  <strong>Customer</strong>

                  <p style={infoText}>
                    {order.full_name || "Guest User"}
                    <br />
                    {order.email || "No email"}
                  </p>
                </div>

                <div>
                  <strong>Shipping</strong>

                  <p style={infoText}>
                    {order.shipping_city}, {order.shipping_country}
                  </p>
                </div>

                <div>
                  <strong>Total</strong>

                  <h3 style={priceText}>
                    ${Number(order.total_amount).toFixed(2)}
                  </h3>
                </div>

                <div>
                  <strong>Status</strong>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.order_id, e.target.value)
                    }
                    style={selectStyle}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
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

const ordersList: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const orderCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const orderTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const orderGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr 0.8fr 1fr",
  gap: "18px",
  alignItems: "center",
};

const mutedText: React.CSSProperties = {
  color: "#666",
  margin: "6px 0 0",
  fontSize: "14px",
};

const infoText: React.CSSProperties = {
  color: "#666",
  lineHeight: "1.6",
  marginBottom: 0,
};

const priceText: React.CSSProperties = {
  color: "#BFA56A",
  margin: "8px 0 0",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const emptyBox: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "40px",
  textAlign: "center",
};

const getStatusStyle = (status: string): React.CSSProperties => {
  const base: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "13px",
    textTransform: "capitalize",
  };

  if (status === "delivered") {
    return { ...base, background: "#ecfdf5", color: "#047857" };
  }

  if (status === "shipped") {
    return { ...base, background: "#eff6ff", color: "#1d4ed8" };
  }

  if (status === "cancelled") {
    return { ...base, background: "#fff1f2", color: "#b91c1c" };
  }

  return { ...base, background: "#fffbeb", color: "#92400e" };
};

export default AdminOrdersPage;