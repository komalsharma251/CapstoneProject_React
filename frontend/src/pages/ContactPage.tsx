import { useState } from "react";
import toast from "react-hot-toast";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api/contact/create.php",
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
        toast.success("Message submitted successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Message failed.");
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
      <section style={heroSection}>
        <span style={smallLabel}>Contact Shahizewer</span>
        <h1 style={title}>We’d Love to Hear From You</h1>
        <p style={subtitle}>
          Have questions about jewellery, appointments, custom pieces, or orders?
          Send us a message and our team will get back to you.
        </p>
      </section>

      <section style={contactGrid}>
        <div style={infoCard}>
          <h2>Get in Touch</h2>

          <div style={infoItem}>
            <strong>📞 Phone</strong>
            <p>+1 647 123 4567</p>
          </div>

          <div style={infoItem}>
            <strong>📧 Email</strong>
            <p>info@shahizewer.com</p>
          </div>

          <div style={infoItem}>
            <strong>📍 Location</strong>
            <p>Brampton, Ontario, Canada</p>
          </div>

          <div style={infoItem}>
            <strong>⏰ Business Hours</strong>
            <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formCard}>
          <h2 style={{ marginTop: 0 }}>Send a Message</h2>

          <input
            required
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
          />

          <textarea
            required
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
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
            {isSubmitting ? "Submitting..." : "Submit Message"}
          </button>
        </form>
      </section>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const heroSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "40px",
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
  color: "#111",
};

const subtitle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
  color: "#666",
  lineHeight: "1.7",
  fontSize: "16px",
};

const contactGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "0.8fr 1.2fr",
  gap: "30px",
  alignItems: "start",
};

const infoCard: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
};

const infoItem: React.CSSProperties = {
  marginTop: "22px",
  lineHeight: "1.6",
  color: "rgba(255,255,255,0.82)",
};

const formCard: React.CSSProperties = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  border: "1px solid #eee",
  boxShadow: "0 14px 35px rgba(0,0,0,0.07)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "10px",
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

export default ContactPage;