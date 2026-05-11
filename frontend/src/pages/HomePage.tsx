
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={pageWrapper}>
      {/* HERO */}
      <section style={hero}>
        <div style={heroContent}>
          <span style={smallLabel}>Premium Indian Jewellery in Canada</span>

          <h1 style={heroTitle}>
            Traditional Jewellery, Styled for Modern Elegance
          </h1>

          <p style={heroText}>
            Discover handcrafted-inspired Indian jewellery pieces for weddings,
            festivals, gifting, and everyday luxury.
          </p>

          <div style={heroButtons}>
            <Link to="/shop" style={primaryBtn}>
              Shop Collection
            </Link>

            <Link to="/contact" style={secondaryBtn}>
              Book Appointment
            </Link>
          </div>
        </div>

        <div style={heroImageCard}>
          <img
            src="http://localhost/WEBSITES/shahijewer_website/assets/images/necklace4.png"
            alt="Shahizewer Jewellery"
            style={heroImage}
            onError={(e) => {
              e.currentTarget.src =
                "http://localhost/WEBSITES/shahijewer_website/assets/images/default.png";
            }}
          />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={trustStrip}>
        <div style={trustItem}>🚚 Free Shipping in Canada</div>
        <div style={trustItem}>💎 Premium Jewellery Selection</div>
        <div style={trustItem}>🔒 Secure Checkout</div>
        <div style={trustItem}>🎁 Gift-Ready Pieces</div>
      </section>

      {/* CATEGORIES */}
      <section style={section}>
        <div style={sectionHeader}>
          <span style={smallLabel}>Shop by Style</span>
          <h2 style={sectionTitle}>Explore Popular Collections</h2>
          <p style={sectionText}>
            Find jewellery for bridal looks, parties, gifting, and traditional
            occasions.
          </p>
        </div>

        <div style={categoryGrid}>
          {categories.map((item) => (
            <Link to="/shop" key={item.title} style={categoryCard}>
              <img
                src={item.image}
                alt={item.title}
                style={categoryImage}
                onError={(e) => {
                  e.currentTarget.src =
                    "http://localhost/WEBSITES/shahijewer_website/assets/images/default.png";
                }}
              />
              <div style={categoryOverlay}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section style={featuredSection}>
        <div>
          <span style={smallLabel}>Featured Collection</span>
          <h2 style={featuredTitle}>Jewellery That Completes Every Occasion</h2>
          <p style={featuredText}>
            Shahizewer focuses on elegant Indian jewellery designs that bring
            tradition, detail, and beauty together. Whether you are preparing
            for a wedding, cultural event, or special gift, our collection is
            curated to help you shine.
          </p>

          <Link to="/shop" style={primaryBtn}>
            View Products
          </Link>
        </div>

        <div style={featureList}>
          <div style={featureBox}>
            <strong>01</strong>
            <h3>Bridal & Party Looks</h3>
            <p>Perfect pieces for wedding events, receptions, and celebrations.</p>
          </div>

          <div style={featureBox}>
            <strong>02</strong>
            <h3>Traditional Styling</h3>
            <p>Beautiful designs inspired by Indian cultural elegance.</p>
          </div>

          <div style={featureBox}>
            <strong>03</strong>
            <h3>Easy Online Shopping</h3>
            <p>Browse, add to cart, and checkout through a smooth ecommerce flow.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2 style={{ marginTop: 0 }}>Need Help Choosing Jewellery?</h2>
        <p style={ctaText}>
          Contact us for styling guidance, bridal recommendations, and product
          questions.
        </p>

        <Link to="/contact" style={ctaBtn}>
          Contact Us
        </Link>
      </section>
    </div>
  );
}

const categories = [
  {
    title: "Necklaces",
    text: "Statement pieces for elegant looks",
    image:
      "http://localhost/WEBSITES/shahijewer_website/assets/images/necklace4.png",
  },
  {
    title: "Bridal Jewellery",
    text: "Premium styles for special occasions",
    image:
      "http://localhost/WEBSITES/shahijewer_website/assets/images/necklace3.png",
  },
  {
    title: "Earrings",
    text: "Traditional and modern finishing touches",
    image:
      "http://localhost/WEBSITES/shahijewer_website/assets/images/earrings1.png",
  },
];

const pageWrapper: React.CSSProperties = {
  padding: "40px 20px 0",
};

const hero: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "40px",
  alignItems: "center",
  background: "linear-gradient(135deg, #000 0%, #171717 55%, #3b2f14 100%)",
  color: "#fff",
  padding: "60px",
  borderRadius: "28px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
};

const heroContent: React.CSSProperties = {
  maxWidth: "620px",
};

const smallLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontSize: "13px",
};

const heroTitle: React.CSSProperties = {
  fontSize: "56px",
  lineHeight: "1.05",
  margin: "16px 0",
};

const heroText: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  fontSize: "17px",
  lineHeight: "1.8",
  marginBottom: "28px",
};

const heroButtons: React.CSSProperties = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  background: "#BFA56A",
  color: "#000",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const secondaryBtn: React.CSSProperties = {
  display: "inline-block",
  background: "transparent",
  color: "#fff",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
  border: "1px solid rgba(255,255,255,0.28)",
};

const heroImageCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "24px",
  padding: "18px",
};

const heroImage: React.CSSProperties = {
  width: "100%",
  height: "480px",
  objectFit: "cover",
  borderRadius: "18px",
};

const trustStrip: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "28px auto 70px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const trustItem: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  padding: "18px",
  borderRadius: "16px",
  textAlign: "center",
  fontWeight: "bold",
  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
};

const section: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
};

const sectionHeader: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "34px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "38px",
  margin: "12px 0",
  color: "#111",
};

const sectionText: React.CSSProperties = {
  color: "#666",
  maxWidth: "680px",
  margin: "0 auto",
  lineHeight: "1.7",
};

const categoryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const categoryCard: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "22px",
  minHeight: "360px",
  textDecoration: "none",
  background: "#000",
  boxShadow: "0 16px 38px rgba(0,0,0,0.12)",
};

const categoryImage: React.CSSProperties = {
  width: "100%",
  height: "360px",
  objectFit: "cover",
  display: "block",
};

const categoryOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: "26px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  background: "linear-gradient(transparent, rgba(0,0,0,0.86))",
};

const featuredSection: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto 80px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  alignItems: "center",
};

const featuredTitle: React.CSSProperties = {
  fontSize: "40px",
  lineHeight: "1.15",
  margin: "14px 0",
};

const featuredText: React.CSSProperties = {
  color: "#555",
  lineHeight: "1.8",
  marginBottom: "24px",
};

const featureList: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const featureBox: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid #eee",
  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
};

const cta: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#000",
  color: "#fff",
  borderRadius: "26px",
  padding: "48px 24px",
  textAlign: "center",
};

const ctaText: React.CSSProperties = {
  color: "rgba(255,255,255,0.76)",
  maxWidth: "650px",
  margin: "0 auto 22px",
  lineHeight: "1.7",
};

const ctaBtn: React.CSSProperties = {
  display: "inline-block",
  background: "#BFA56A",
  color: "#000",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default HomePage;