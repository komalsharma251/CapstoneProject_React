import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={footer}>
      <div style={topStrip}>
        <div style={topStripInner}>
          <span>🚚 Free Shipping in Canada</span>
          <span>💎 Premium Indian Jewellery</span>
          <span>🔒 Secure Checkout</span>
          <span>🎁 Gift-Ready Styles</span>
        </div>
      </div>

      <div style={footerInner}>
        {/* Brand */}
        <div>
          <h2 style={brand}>SHAHIZEWER</h2>
          <p style={description}>
            Premium Indian jewellery in Canada, curated for weddings, cultural
            celebrations, gifting, and elegant everyday styling.
          </p>

          <div style={socialRow}>
            <span style={socialIcon}>Instagram</span>
            <span style={socialIcon}>Facebook</span>
            <span style={socialIcon}>WhatsApp</span>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 style={heading}>Shop</h4>
          <ul style={list}>
            <li>
              <Link to="/" style={link}>
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/" style={link}>
                Necklaces
              </Link>
            </li>
            <li>
              <Link to="/" style={link}>
                Earrings
              </Link>
            </li>
            <li>
              <Link to="/" style={link}>
                Bridal Collection
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 style={heading}>Company</h4>
          <ul style={list}>
            <li>
              <Link to="/about" style={link}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" style={link}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" style={link}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" style={link}>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={heading}>Contact</h4>

          <p style={contactLine}>📍 Brampton, Ontario, Canada</p>
          <p style={contactLine}>📞 +1 647 123 4567</p>
          <p style={contactLine}>✉️ info@shahizewer.com</p>

          <div style={appointmentBox}>
            <strong style={{ color: "#BFA56A" }}>Need styling help?</strong>
            <p style={{ margin: "8px 0 14px", lineHeight: "1.6" }}>
              Book an appointment for bridal, party, or gift jewellery guidance.
            </p>
            <Link to="/contact" style={appointmentBtn}>
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <div style={bottomBar}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Shahizewer. All rights reserved.
        </p>

        <p style={{ margin: 0 }}>
          Made with ❤️ by Komal
        </p>
      </div>
    </footer>
  );
}

const footer: React.CSSProperties = {
  background: "#000",
  color: "#ccc",
  marginTop: "70px",
};

const topStrip: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  background: "#0b0b0b",
};

const topStripInner: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  justifyContent: "space-between",
  gap: "18px",
  flexWrap: "wrap",
  color: "#BFA56A",
  fontSize: "14px",
  fontWeight: "600",
};

const footerInner: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "54px 20px",
  display: "grid",
  gridTemplateColumns: "1.4fr 0.8fr 0.8fr 1.2fr",
  gap: "36px",
};

const brand: React.CSSProperties = {
  color: "#BFA56A",
  marginTop: 0,
  fontSize: "30px",
  letterSpacing: "1.2px",
};

const description: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.8",
  maxWidth: "320px",
  color: "rgba(255,255,255,0.72)",
};

const heading: React.CSSProperties = {
  color: "#fff",
  marginTop: 0,
  marginBottom: "16px",
  fontSize: "16px",
  letterSpacing: "0.5px",
};

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const link: React.CSSProperties = {
  color: "rgba(255,255,255,0.72)",
  textDecoration: "none",
  display: "block",
  marginBottom: "11px",
  fontSize: "14px",
};

const contactLine: React.CSSProperties = {
  margin: "0 0 10px",
  color: "rgba(255,255,255,0.72)",
  fontSize: "14px",
  lineHeight: "1.6",
};

const socialRow: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const socialIcon: React.CSSProperties = {
  border: "1px solid rgba(191,165,106,0.35)",
  color: "#BFA56A",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
};

const appointmentBox: React.CSSProperties = {
  marginTop: "20px",
  padding: "18px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.72)",
  fontSize: "14px",
};

const appointmentBtn: React.CSSProperties = {
  display: "inline-block",
  background: "#BFA56A",
  color: "#000",
  padding: "10px 16px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "13px",
};

const bottomBar: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  padding: "18px 20px",
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  color: "rgba(255,255,255,0.58)",
  fontSize: "13px",
};

export default Footer;