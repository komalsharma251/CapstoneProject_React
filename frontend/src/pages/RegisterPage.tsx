
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost/websites/shahizewer_api/api/auth/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.full_name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed.");
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
      <div style={registerCard}>
        <div style={brandSection}>
          <span style={smallLabel}>Create Account</span>
          <h1 style={title}>Join Shahizewer</h1>
          <p style={subtitle}>
            Create your account to enjoy a smoother jewellery shopping
            experience.
          </p>
        </div>

        <form onSubmit={handleRegister} style={formStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            required
            type="text"
            placeholder="Enter your full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            style={inputStyle}
          />

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
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
          />

          <label style={labelStyle}>Confirm Password</label>
          <input
            required
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
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
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <p style={bottomText}>
            Already have an account?{" "}
            <Link to="/login" style={goldLink}>
              Login
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

const registerCard: React.CSSProperties = {
  width: "100%",
  maxWidth: "560px",
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

export default RegisterPage;