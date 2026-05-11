
const galleryImages = [
  {
    id: 1,
    title: "Bridal Necklace Collection",
    image: "assets/images/necklace4.png",
  },
  {
    id: 2,
    title: "Traditional Jewellery Set",
    image: "assets/images/necklace2.png",
  },
  {
    id: 3,
    title: "Luxury Earrings",
    image: "assets/images/earrings1.png",
  },
  {
    id: 4,
    title: "Punjabi Paranda",
    image: "assets/images/paranda.png",
  },
  {
    id: 5,
    title: "Engagement Ring",
    image: "assets/images/ring1.png",
  },
  {
    id: 6,
    title: "Premium Bridal Look",
    image: "assets/images/necklace3.png",
  },
];

function GalleryPage() {
  const getImageUrl = (image: string) =>
    `http://localhost/WEBSITES/shahijewer_website/${image}`;

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Shahizewer Gallery</span>
        <h1 style={title}>Luxury Jewellery Moments</h1>
        <p style={subtitle}>
          Explore our premium Indian jewellery collection, bridal pieces,
          traditional accessories, and elegant styling inspiration.
        </p>
      </section>

      <section style={galleryGrid}>
        {galleryImages.map((item) => (
          <div key={item.id} style={galleryCard}>
            <img
              src={getImageUrl(item.image)}
              alt={item.title}
              style={galleryImage}
              onError={(e) => {
                e.currentTarget.src =
                  "http://localhost/WEBSITES/shahijewer_website/assets/images/default.png";
              }}
            />

            <div style={overlay}>
              <h3>{item.title}</h3>
              <p>Premium Indian Jewellery</p>
            </div>
          </div>
        ))}
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
  fontSize: "44px",
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

const galleryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "22px",
};

const galleryCard: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "18px",
  minHeight: "340px",
  background: "#111",
  boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
};

const galleryImage: React.CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "340px",
  objectFit: "cover",
  display: "block",
};

const overlay: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "24px",
  color: "#fff",
  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
};

export default GalleryPage;