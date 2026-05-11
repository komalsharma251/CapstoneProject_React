import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../utils/cart";
import { getCart, saveCart } from "../utils/cart";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

const IMAGE_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    address: "",
    city: "",
    postal_code: "",
    country: "Canada",
  });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      toast.error("Please login before placing an order.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    setIsSubmitting(true);
    setMessage("");

    const orderData = {
      user_id: user.user_id,
      customer: form,
      cart,
      total,
    };

    try {
      const response = await fetch(`${API_BASE}/orders/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Order placed! ID: ${result.order_id}`);

        saveCart([]);
        setCart([]);
        window.dispatchEvent(new Event("cartUpdated"));

        setForm({
          address: "",
          city: "",
          postal_code: "",
          country: "Canada",
        });
      } else {
        toast.error(result.message || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing the order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !message) {
    return (
      <div style={{ padding: "70px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "70px", marginBottom: "20px" }}>🛒</div>
        <h1>Your cart is empty</h1>
        <p>Please add jewellery items before checkout.</p>

        <Link
          to="/shop"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "#000",
            color: "#BFA56A",
            padding: "13px 24px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 20px", maxWidth: "1120px", margin: "0 auto" }}>
      <Link to="/cart" style={{ color: "#BFA56A", textDecoration: "none" }}>
        ← Back to Cart
      </Link>

      <h1 style={{ marginTop: "20px", marginBottom: "8px" }}>Checkout</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Enter your shipping details to complete your order.
      </p>

      {message && (
        <div
          style={{
            background: message.includes("successfully") ? "#ecfdf5" : "#fff1f2",
            color: message.includes("successfully") ? "#047857" : "#b91c1c",
            border: message.includes("successfully")
              ? "1px solid #a7f3d0"
              : "1px solid #fecaca",
            padding: "14px 16px",
            borderRadius: "12px",
            marginBottom: "22px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "28px",
            borderRadius: "18px",
            border: "1px solid #eee",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Shipping Information</h2>

          <label style={labelStyle}>Shipping Address</label>
          <textarea
            required
            placeholder="Street address, house/unit number"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
          />

          <label style={labelStyle}>City</label>
          <input
            required
            placeholder="Brampton"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            style={inputStyle}
          />

          <label style={labelStyle}>Postal Code</label>
          <input
            required
            placeholder="L6X 1A1"
            value={form.postal_code}
            onChange={(e) =>
              setForm({ ...form, postal_code: e.target.value })
            }
            style={inputStyle}
          />

          <label style={labelStyle}>Country</label>
          <input
            required
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            style={{
              width: "100%",
              marginTop: "12px",
              background: isSubmitting ? "#777" : "#000",
              color: "#BFA56A",
              border: "none",
              padding: "15px 22px",
              borderRadius: "999px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside
          style={{
            background: "#000",
            color: "#fff",
            padding: "28px",
            borderRadius: "18px",
            boxShadow: "0 14px 35px rgba(0,0,0,0.16)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Order Summary</h2>

          {cart.map((item) => {
            const itemPrice = Number(item.price || 0);
            const itemTotal = itemPrice * item.quantity;
            const imageSrc = item.image_url
              ? `${IMAGE_BASE}/${String(item.image_url).replace(/^\/+/, "")}`
              : "/default-product.png";

            return (
              <div
                key={item.product_id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr auto",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "16px",
                  color: "rgba(255,255,255,0.86)",
                }}
              >
                <img
                  src={imageSrc}
                  alt={item.product_name}
                  onError={(e) => {
                    e.currentTarget.src = "/default-product.png";
                  }}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    background: "#fff",
                  }}
                />

                <span>
                  {item.product_name} × {item.quantity}
                </span>

                <strong>${itemTotal.toFixed(2)}</strong>
              </div>
            );
          })}

          <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

          <div style={summaryRow}>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div style={summaryRow}>
            <span>Estimated Tax</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>

          <div style={summaryRow}>
            <span>Shipping</span>
            <strong style={{ color: "#BFA56A" }}>Free</strong>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "22px",
              fontWeight: "bold",
              marginTop: "18px",
            }}
          >
            <span>Total</span>
            <span style={{ color: "#BFA56A" }}>${total.toFixed(2)}</span>
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "13px",
              lineHeight: "1.6",
              marginTop: "18px",
            }}
          >
            Orders are saved under the logged-in customer account.
          </p>
        </aside>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "bold",
  color: "#222",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  margin: "14px 0",
  color: "rgba(255,255,255,0.86)",
};

export default CheckoutPage;