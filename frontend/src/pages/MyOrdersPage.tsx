
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Order = {
  order_id: number;
  order_date: string;
  status: string;
  total_amount: number | string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
};

function MyOrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      toast.error("Please login to view your orders.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    fetch(
  `http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/orders/user-orders.php?user_id=${user.user_id}`
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
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "70px", marginBottom: "16px" }}>📦</div>

        <h1>No Orders Yet</h1>

        <p style={{ color: "#666" }}>
          You haven’t placed any orders yet. Start shopping your favourite
          jewellery pieces.
        </p>

        <Link to="/shop" style={shopBtn}>
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 20px", maxWidth: "1100px", margin: "0 auto" }}>
      <span style={smallLabel}>Customer Account</span>

      <h1 style={{ margin: "12px 0 8px" }}>My Orders</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        View your recent Shahizewer jewellery orders.
      </p>

      <div style={{ display: "grid", gap: "18px" }}>
        {orders.map((order) => (
          <div key={order.order_id} style={orderCard}>
            <div style={orderHeader}>
              <div>
                <h3 style={{ margin: "0 0 6px" }}>
                  Order #{order.order_id}
                </h3>

                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Placed on {new Date(order.order_date).toLocaleString()}
                </p>
              </div>

              <span style={statusBadge}>{order.status}</span>
            </div>

            <div style={orderGrid}>
              <div>
                <strong>Shipping Address</strong>
                <p style={infoText}>
                  {order.shipping_address}
                  <br />
                  {order.shipping_city}, {order.shipping_postal_code}
                  <br />
                  {order.shipping_country}
                </p>
              </div>

              <div>
                <strong>Total Amount</strong>
                <h2 style={{ color: "#BFA56A", margin: "8px 0 0" }}>
                  ${Number(order.total_amount).toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const smallLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontSize: "13px",
};

const orderCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: "18px",
  padding: "24px",
  border: "1px solid #eee",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const orderHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const statusBadge: React.CSSProperties = {
  background: "#ecfdf5",
  color: "#047857",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "13px",
  textTransform: "capitalize",
};

const orderGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "24px",
  alignItems: "center",
};

const infoText: React.CSSProperties = {
  color: "#666",
  lineHeight: "1.7",
  marginBottom: 0,
};

const shopBtn: React.CSSProperties = {
  display: "inline-block",
  marginTop: "22px",
  background: "#000",
  color: "#BFA56A",
  padding: "13px 24px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default MyOrdersPage;