import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../utils/cart";
import { getCart, saveCart } from "../utils/cart";

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateQuantity = (productId: number, quantity: number) => {
    const updatedCart = cart
      .map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (productId: number) => {
    const updatedCart = cart.filter((item) => item.product_id !== productId);

    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "70px", marginBottom: "16px" }}>🛒</div>

        <h1>Your Cart is Empty</h1>
        <p>Add some beautiful jewellery to your cart.</p>

        <Link
          to="/shop"
          style={{
            display: "inline-block",
            marginTop: "20px",
            background: "#000",
            color: "#BFA56A",
            padding: "12px 22px",
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
    <div style={{ padding: "50px 20px", maxWidth: "1180px", margin: "0 auto" }}>
      <Link to="/shop" style={{ color: "#BFA56A", textDecoration: "none" }}>
        ← Continue Shopping
      </Link>

      <h1 style={{ marginTop: "20px", marginBottom: "8px" }}>Shopping Cart</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Review your selected jewellery pieces before checkout.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 0.8fr",
          gap: "28px",
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: "20px" }}>
          {cart.map((item) => {
            const itemPrice = Number(item.price || 0);
            const itemTotal = itemPrice * item.quantity;

            return (
              <div
                key={item.product_id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: "20px",
                  alignItems: "center",
                  background: "#fff",
                  padding: "18px",
                  borderRadius: "16px",
                  border: "1px solid #eee",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                }}
              >
                <img
  src={`http://localhost/WEBSITES/shahizewer_react_capstone/${String(
    item.image_url || ""
  ).replace(/^\/+/, "")}`}
  alt={item.product_name}
  onError={(e) => {
    e.currentTarget.src = "/default-product.png";
  }}
  style={{
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
  }}
/>

                <div>
                  <h3 style={{ margin: "0 0 8px" }}>{item.product_name}</h3>

                  <p
                    style={{
                      color: "#BFA56A",
                      fontWeight: "bold",
                      margin: "0 0 14px",
                    }}
                  >
                    ${itemPrice.toFixed(2)}
                  </p>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                      style={qtyBtn}
                    >
                      -
                    </button>

                    <strong style={{ minWidth: "42px", textAlign: "center" }}>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "18px" }}>
                    ${itemTotal.toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.product_id)}
                    style={{
                      background: "#fff1f1",
                      color: "#b91c1c",
                      border: "1px solid #fecaca",
                      padding: "9px 14px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <aside
          style={{
            background: "#000",
            color: "white",
            padding: "28px",
            borderRadius: "20px",
            position: "sticky",
            top: "100px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Order Summary</h2>

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

          <hr style={{ borderColor: "rgba(255,255,255,0.18)" }} />

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

          <Link
            to="/checkout"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              marginTop: "28px",
              background: "#BFA56A",
              color: "#000",
              border: "none",
              padding: "15px 22px",
              borderRadius: "999px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Proceed to Checkout
          </Link>

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "13px",
              lineHeight: "1.6",
              marginTop: "18px",
            }}
          >
            Taxes are estimated at 13%. Final checkout details will be completed
            on the checkout page.
          </p>
        </aside>
      </div>
    </div>
  );
}

const qtyBtn: React.CSSProperties = {
  width: "38px",
  height: "36px",
  border: "none",
  background: "#f5f5f5",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "18px",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  margin: "16px 0",
  color: "rgba(255,255,255,0.85)",
};

export default CartPage;