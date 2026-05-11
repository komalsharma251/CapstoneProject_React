
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>About Shahizewer</span>

        <h1 style={title}>
          Premium Indian Jewellery for Modern Elegance
        </h1>

        <p style={subtitle}>
          Shahizewer brings traditional Indian jewellery styling together with a
          modern luxury shopping experience for customers in Canada.
        </p>

        <Link to="/" style={shopBtn}>
          Explore Collection
        </Link>
      </section>

      <section style={storyGrid}>
        <div>
          <span style={smallLabel}>Our Story</span>
          <h2 style={sectionTitle}>Designed for Tradition, Styled for Today</h2>

          <p style={paragraph}>
            Shahizewer was created for customers who love Indian traditional
            jewellery but also want a clean, premium, and convenient shopping
            experience. Our collection focuses on pieces that are perfect for
            weddings, parties, cultural events, and elegant everyday styling.
          </p>

          <p style={paragraph}>
            From statement necklaces to earrings and accessories, each piece is
            selected with attention to beauty, quality, and presentation.
          </p>
        </div>

        <div style={imageCard}>
          <img
            src="http://localhost/WEBSITES/shahijewer_website/assets/images/necklace4.png"
            alt="Shahizewer Jewellery"
            style={image}
            onError={(e) => {
              e.currentTarget.src =
                "http://localhost/WEBSITES/shahijewer_website/assets/images/default.png";
            }}
          />
        </div>
      </section>

      <section style={valuesSection}>
        <span style={smallLabel}>Why Choose Us</span>
        <h2 style={centerTitle}>A Jewellery Experience Built on Trust</h2>

        <div style={valuesGrid}>
          <div style={valueCard}>
            <div style={icon}>💎</div>
            <h3>Premium Selection</h3>
            <p>
              Jewellery pieces chosen for elegant styling, beautiful finishing,
              and traditional appeal.
            </p>
          </div>

          <div style={valueCard}>
            <div style={icon}>🚚</div>
            <h3>Canada-Focused Service</h3>
            <p>
              Built for Canadian customers with easy browsing, local service,
              and free shipping options.
            </p>
          </div>

          <div style={valueCard}>
            <div style={icon}>🎁</div>
            <h3>Gift-Ready Style</h3>
            <p>
              Perfect for weddings, engagements, festivals, birthdays, and
              special celebrations.
            </p>
          </div>
        </div>
      </section>

      <section style={ctaSection}>
        <h2 style={{ marginTop: 0 }}>Ready to Find Your Next Favourite Piece?</h2>

        <p style={{ color: "rgba(255,255,255,0.78)", lineHeight: "1.7" }}>
          Explore our premium jewellery collection and discover pieces that make
          every occasion feel special.
        </p>

        <Link to="/" style={ctaBtn}>
          Shop Now
        </Link>
      </section>
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const hero: React.CSSProperties = {
  textAlign: "center",
  background: "linear-gradient(135deg, #000 0%, #171717 60%, #3b2f14 100%)",
  color: "#fff",
  padding: "70px 24px",
  borderRadius: "26px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
  marginBottom: "60px",
};

const smallLabel: React.CSSProperties = {
  color: "#BFA56A",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  fontSize: "13px",
};

const title: React.CSSProperties = {
  fontSize: "48px",
  lineHeight: "1.1",
  maxWidth: "820px",
  margin: "16px auto",
};

const subtitle: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto 28px",
  color: "rgba(255,255,255,0.78)",
  fontSize: "17px",
  lineHeight: "1.8",
};

const shopBtn: React.CSSProperties = {
  display: "inline-block",
  background: "#BFA56A",
  color: "#000",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const storyGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  alignItems: "center",
  marginBottom: "70px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "36px",
  lineHeight: "1.2",
  margin: "14px 0",
  color: "#111",
};

const paragraph: React.CSSProperties = {
  color: "#555",
  lineHeight: "1.8",
  fontSize: "16px",
};

const imageCard: React.CSSProperties = {
  background: "#f7f3ec",
  padding: "20px",
  borderRadius: "24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
};

const image: React.CSSProperties = {
  width: "100%",
  height: "430px",
  objectFit: "cover",
  borderRadius: "18px",
};

const valuesSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "70px",
};

const centerTitle: React.CSSProperties = {
  fontSize: "36px",
  margin: "14px auto 32px",
  maxWidth: "720px",
  color: "#111",
};

const valuesGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "22px",
};

const valueCard: React.CSSProperties = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  border: "1px solid #eee",
  boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
};

const icon: React.CSSProperties = {
  fontSize: "38px",
  marginBottom: "10px",
};

const ctaSection: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "44px",
  borderRadius: "24px",
  textAlign: "center",
};

const ctaBtn: React.CSSProperties = {
  display: "inline-block",
  marginTop: "16px",
  background: "#BFA56A",
  color: "#000",
  padding: "14px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default AboutPage;