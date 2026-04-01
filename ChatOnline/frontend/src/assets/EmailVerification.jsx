import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnectoLogo = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradEV" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60b8f5" />
        <stop offset="100%" stopColor="#3a8fd8" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C17.64 6 6 17.64 6 32c0 4.56 1.22 8.83 3.33 12.5L6 58l13.84-3.26A25.84 25.84 0 0032 58c14.36 0 26-11.64 26-26S46.36 6 32 6z"
      fill="url(#logoGradEV)"
    />
    <circle cx="22" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="42" cy="32" r="3" fill="white" />
  </svg>
);

const MailIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#3a8fd8" strokeWidth="1.5" fill="rgba(58,143,216,0.08)" />
    <path d="M2 7l10 7 10-7" stroke="#3a8fd8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="18" r="5" fill="#34c98a" />
    <path d="M15.5 18l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function EmailVerification() {
  const navigate = useNavigate();
  const [resendMsg, setResendMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("verifyEmail");

  async function handleResend() {
    setResendMsg("");
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email: email,
      });
      setResendMsg("Verification email resent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend email!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ ...styles.blob, ...blobPositions[i] }} />
      ))}

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <ConnectoLogo />
          <span style={styles.logoText}>CONNECTO</span>
        </div>

        {/* Mail Icon */}
        <div style={styles.iconWrap}>
          <MailIcon />
        </div>

        {/* Heading */}
        <h1 style={styles.heading}>Verify Your Email!</h1>
        <p style={styles.subheading}>
          We sent a verification link to{" "}
          <span style={{ color: "#3a8fd8", fontWeight: 700 }}>
            {email}
          </span>
          <br />
          Please check your inbox and click the link to activate your account.
        </p>

        {/* Steps */}
        <div style={styles.stepsWrap}>
          {[
            { step: "1", text: "Open your Gmail inbox" },
            { step: "2", text: "Find email from CONNECTO" },
            { step: "3", text: "Click the verification link" },
            { step: "4", text: "Come back and login ✅" },
          ].map((item) => (
            <div key={item.step} style={styles.stepRow}>
              <div style={styles.stepNum}>{item.step}</div>
              <span style={styles.stepText}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Error / Success */}
        {error && <p style={styles.error}>{error}</p>}
        {resendMsg && <p style={styles.success}>{resendMsg}</p>}

        {/* Resend Button */}
        <button
          style={{ ...styles.resendBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>

        {/* Go to Login */}
        <button
          style={styles.loginBtn}
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
}

const blobPositions = [
  { top: "8%", left: "6%", animationDelay: "0s" },
  { top: "15%", right: "7%", animationDelay: "0.8s" },
  { top: "45%", left: "2%", animationDelay: "1.4s", width: 40, height: 40 },
  { bottom: "20%", left: "12%", animationDelay: "0.4s", width: 55, height: 55 },
  { bottom: "12%", right: "5%", animationDelay: "1s", width: 65, height: 65 },
  { top: "60%", right: "10%", animationDelay: "1.8s", width: 40, height: 40 },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #c8e6fa 0%, #dceeff 40%, #f8d8d0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Nunito', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 16,
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.5)",
    animation: "float 4s ease-in-out infinite",
    boxShadow: "0 4px 16px rgba(100,160,220,0.12)",
  },
  card: {
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 8px 40px rgba(100,160,220,0.18)",
    padding: "40px 48px",
    width: 420,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: 3,
    color: "#2d7bbf",
    marginTop: 5,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    background: "rgba(58,143,216,0.08)",
    border: "1.5px solid rgba(58,143,216,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 800,
    color: "#1a3a5c",
    textAlign: "center",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 13,
    color: "#6b8caa",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 1.7,
  },
  stepsWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 24,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: "16px 18px",
    border: "1px solid rgba(255,255,255,0.7)",
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    color: "white",
    fontWeight: 800,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#2d4a6a",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  success: {
    color: "#34c98a",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 10,
    textAlign: "center",
  },
  resendBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    color: "white",
    fontWeight: 800,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    marginBottom: 10,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(58,143,216,0.35)",
    transition: "opacity 0.2s",
  },
  loginBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.7)",
    color: "#3a8fd8",
    fontWeight: 800,
    fontSize: 14,
    border: "1.5px solid rgba(58,143,216,0.3)",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "opacity 0.2s",
  },
};
