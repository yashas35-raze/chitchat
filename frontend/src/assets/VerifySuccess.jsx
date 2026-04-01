import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ConnectoLogo = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradVS" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60b8f5" />
        <stop offset="100%" stopColor="#3a8fd8" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C17.64 6 6 17.64 6 32c0 4.56 1.22 8.83 3.33 12.5L6 58l13.84-3.26A25.84 25.84 0 0032 58c14.36 0 26-11.64 26-26S46.36 6 32 6z"
      fill="url(#logoGradVS)"
    />
    <circle cx="22" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="42" cy="32" r="3" fill="white" />
  </svg>
);

export default function VerifySuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");

  useEffect(function () {
    async function verifyEmail() {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link!");
        return;
      }

      try {
        await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}`
        );
        setStatus("success");
        // auto redirect to login after 3 seconds
        setTimeout(function () {
          navigate("/");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed!");
      }
    }

    verifyEmail();
  }, [token]);

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

        {/* Verifying state */}
        {status === "verifying" && (
          <>
            <div style={styles.iconWrap}>
              <div style={styles.spinner} />
            </div>
            <h1 style={styles.heading}>Verifying your email...</h1>
            <p style={styles.subheading}>Please wait a moment.</p>
          </>
        )}

        {/* Success state */}
        {status === "success" && (
          <>
            <div style={{ ...styles.iconWrap, background: "rgba(52,201,138,0.1)", border: "1.5px solid rgba(52,201,138,0.3)" }}>
              <span style={{ fontSize: 48 }}>✅</span>
            </div>
            <h1 style={{ ...styles.heading, color: "#34c98a" }}>
              Email Verified!
            </h1>
            <p style={styles.subheading}>
              Your account has been activated successfully.
              <br />
              Redirecting to login in 3 seconds...
            </p>

            {/* Progress bar */}
            <div style={styles.progressWrap}>
              <div style={styles.progressBar} />
            </div>

            <button
              style={styles.loginBtn}
              onClick={() => navigate("/")}
            >
              Go to Login Now
            </button>
          </>
        )}

        {/* Error state */}
        {status === "error" && (
          <>
            <div style={{ ...styles.iconWrap, background: "rgba(255,80,80,0.08)", border: "1.5px solid rgba(255,80,80,0.2)" }}>
              <span style={{ fontSize: 48 }}>❌</span>
            </div>
            <h1 style={{ ...styles.heading, color: "#e05c5c" }}>
              Verification Failed!
            </h1>
            <p style={styles.subheading}>{message}</p>
            <button
              style={styles.loginBtn}
              onClick={() => navigate("/signup")}
            >
              Back to Signup
            </button>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
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
    marginBottom: 20,
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
  spinner: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "4px solid rgba(58,143,216,0.2)",
    borderTop: "4px solid #3a8fd8",
    animation: "spin 1s linear infinite",
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
  progressWrap: {
    width: "100%",
    height: 6,
    background: "rgba(58,143,216,0.15)",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    borderRadius: 10,
    animation: "progress 3s linear forwards",
  },
  loginBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    color: "white",
    fontWeight: 800,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(58,143,216,0.35)",
  },
};
