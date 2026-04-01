import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnectoLogo = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradOTP" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60b8f5" />
        <stop offset="100%" stopColor="#3a8fd8" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C17.64 6 6 17.64 6 32c0 4.56 1.22 8.83 3.33 12.5L6 58l13.84-3.26A25.84 25.84 0 0032 58c14.36 0 26-11.64 26-26S46.36 6 32 6z"
      fill="url(#logoGradOTP)"
    />
    <circle cx="22" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="42" cy="32" r="3" fill="white" />
  </svg>
);

const OTPIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#3a8fd8" strokeWidth="1.5" fill="rgba(58,143,216,0.08)" />
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="#3a8fd8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="#3a8fd8" />
  </svg>
);

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const inputRefs = useRef([]);

  const email = localStorage.getItem("resetEmail");

  function handleChange(value, index) {
    if (!/^\d*$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    // move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  async function handleVerify() {
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      setError("Please enter the complete 6-digit OTP!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: email,
        otp: otpValue,
      });
      // save otp to use in ResetPassword page
      localStorage.setItem("resetOTP", otpValue);
      navigate("/reset-password");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setResendMsg("");
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email: email,
      });
      setResendMsg("OTP resent successfully!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP!");
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

        {/* OTP Icon */}
        <div style={styles.iconWrap}>
          <OTPIcon />
        </div>

        {/* Heading */}
        <h1 style={styles.heading}>Enter OTP</h1>
        <p style={styles.subheading}>
          We sent a 6-digit OTP to{" "}
          <span style={{ color: "#3a8fd8", fontWeight: 700 }}>
            {email}
          </span>
        </p>

        {/* OTP Inputs */}
        <div style={styles.otpRow}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                ...styles.otpInput,
                borderColor: digit ? "#3a8fd8" : "rgba(255,255,255,0.6)",
                background: digit ? "rgba(58,143,216,0.08)" : "rgba(255,255,255,0.65)",
              }}
            />
          ))}
        </div>

        {/* Error / Success */}
        {error && <p style={styles.error}>{error}</p>}
        {resendMsg && <p style={styles.success}>{resendMsg}</p>}

        {/* Verify Button */}
        <button
          style={{ ...styles.verifyBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend OTP */}
        <p style={styles.resendText}>
          Didn't receive OTP?{" "}
          <span onClick={handleResend} style={styles.resendLink}>
            Resend OTP
          </span>
        </p>

        {/* Back to Login */}
        <p style={{ ...styles.resendText, marginTop: 8 }}>
          <span onClick={() => navigate("/")} style={styles.resendLink}>
            ← Back to Login
          </span>
        </p>
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
    width: 80,
    height: 80,
    borderRadius: 20,
    background: "rgba(58,143,216,0.1)",
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
    marginBottom: 8,
  },
  subheading: {
    fontSize: 13,
    color: "#6b8caa",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 1.6,
  },
  otpRow: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
    justifyContent: "center",
  },
  otpInput: {
    width: 48,
    height: 54,
    borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.6)",
    fontSize: 22,
    fontWeight: 800,
    color: "#1a3a5c",
    textAlign: "center",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "'Nunito', sans-serif",
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
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 700,
  },
  verifyBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    color: "white",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 1,
    border: "none",
    cursor: "pointer",
    marginBottom: 16,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(58,143,216,0.35)",
    transition: "opacity 0.2s",
  },
  resendText: {
    fontSize: 13,
    color: "#6b8caa",
  },
  resendLink: {
    color: "#3a8fd8",
    fontWeight: 700,
    cursor: "pointer",
  },
};
