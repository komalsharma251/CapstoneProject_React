import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE =
  "http://localhost/WEBSITES/shahizewer_react_capstone/shahizewer_api/api";

type ContactMessage = {
  message_id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || JSON.parse(savedUser).role !== "admin") {
      toast.error("Admin access only.");
      window.location.href = "/";
      return;
    }

    fetch(`${API_BASE}/admin/messages/list.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.messages);
        } else {
          toast.error(data.message || "Failed to load messages.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong loading messages.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading messages...</h2>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <section style={hero}>
        <span style={smallLabel}>Admin Messages</span>

        <h1 style={title}>Customer Inquiries</h1>

        <p style={subtitle}>
          Read contact form submissions from Shahizewer customers.
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link to="/admin" style={dashboardBtn}>
            ← Back to Dashboard
          </Link>
        </div>
      </section>

      <div style={summaryCard}>
        <span>Total Messages</span>
        <strong>{messages.length}</strong>
      </div>

      {messages.length === 0 ? (
        <div style={emptyBox}>
          <h2>No messages found</h2>
          <p>No contact inquiries have been submitted yet.</p>
        </div>
      ) : (
        <div style={messageGrid}>
          {messages.map((item) => (
            <div key={item.message_id} style={messageCard}>
              <div style={messageTop}>
                <div>
                  <h2 style={{ margin: 0 }}>{item.name}</h2>

                  <p style={mutedText}>
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <span style={badge}>Message #{item.message_id}</span>
              </div>

              <div style={infoGrid}>
                <div>
                  <strong>Email</strong>

                  <p style={infoText}>{item.email}</p>
                </div>

                <div>
                  <strong>Phone</strong>

                  <p style={infoText}>{item.phone || "Not provided"}</p>
                </div>
              </div>

              <div style={messageBox}>
                <strong>Message</strong>

                <p style={{ color: "#555", lineHeight: "1.7", marginBottom: 0 }}>
                  {item.message}
                </p>
              </div>

              <div style={actionRow}>
                <a href={`mailto:${item.email}`} style={replyBtn}>
                  Reply by Email
                </a>

                {item.phone && (
                  <a href={`tel:${item.phone}`} style={callBtn}>
                    Call Customer
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const pageWrapper: React.CSSProperties = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "50px 20px",
};

const hero: React.CSSProperties = {
  background: "linear-gradient(135deg, #000 0%, #171717 60%, #3b2f14 100%)",
  color: "#fff",
  padding: "48px 28px",
  borderRadius: "24px",
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
  fontSize: "42px",
  margin: "12px 0",
};

const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,0.75)",
  margin: 0,
};

const dashboardBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#BFA56A",
  color: "#000",
  padding: "12px 20px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const summaryCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "28px",
};

const emptyBox: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "18px",
  padding: "40px",
  textAlign: "center",
};

const messageGrid: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const messageCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const messageTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const mutedText: React.CSSProperties = {
  color: "#666",
  margin: "6px 0 0",
  fontSize: "14px",
};

const badge: React.CSSProperties = {
  background: "#fffbeb",
  color: "#92400e",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "13px",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
  marginBottom: "18px",
};

const infoText: React.CSSProperties = {
  color: "#666",
  lineHeight: "1.6",
  marginBottom: 0,
};

const messageBox: React.CSSProperties = {
  background: "#fafafa",
  border: "1px solid #eee",
  borderRadius: "16px",
  padding: "18px",
};

const actionRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const replyBtn: React.CSSProperties = {
  background: "#000",
  color: "#BFA56A",
  padding: "11px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const callBtn: React.CSSProperties = {
  background: "#BFA56A",
  color: "#000",
  padding: "11px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default AdminMessagesPage;