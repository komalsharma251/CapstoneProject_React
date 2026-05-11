import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/auth/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));

        // Notify Header that user login status changed
        window.dispatchEvent(new Event("userUpdated"));

        toast.success("Login successful!");

        // Redirect based on user role
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={loginCard}>
        <div style={brandSection}>
          <span style={smallLabel}>Welcome Back</span>
          <h1 style={title}>Login to Shahizewer</h1>
          <p style={subtitle}>
            Access your account, manage orders, and enjoy a smoother shopping
            experience.
          </p>
        </div>

        <form onSubmit={handleLogin} style={formStyle}>
          <label style={labelStyle}>Email Address</label>
          <input
            required
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            required
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p style={bottomText}>
            Don’t have an account?{" "}
            <Link to="/register" style={goldLink}>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
};

const loginCard: React.CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  background: "#fff",
  borderRadius: "24px",
  padding: "36px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.09)",
  border: "1px solid #eee",
};

const brandSection: React.CSSProperties = {
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
  margin: "12px 0",
  color: "#111",
  fontSize: "34px",
};

const subtitle: React.CSSProperties = {
  color: "#666",
  lineHeight: "1.7",
  margin: 0,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#222",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
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

const bottomText: React.CSSProperties = {
  marginTop: "20px",
  textAlign: "center",
  color: "#666",
};

const goldLink: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  textDecoration: "none",
};

export default LoginPage;