import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const ConnectoLogo = () => (
  <svg width="60" height="60" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60b8f5" />
        <stop offset="100%" stopColor="#3a8fd8" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C17.64 6 6 17.64 6 32c0 4.56 1.22 8.83 3.33 12.5L6 58l13.84-3.26A25.84 25.84 0 0032 58c14.36 0 26-11.64 26-26S46.36 6 32 6z"
      fill="url(#logoGrad2)"
    />
    <circle cx="22" cy="32" r="3" fill="white" />
    <circle cx="32" cy="32" r="3" fill="white" />
    <circle cx="42" cy="32" r="3" fill="white" />
  </svg>
);

const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="#3a8fd8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="4" stroke="#3a8fd8" strokeWidth="1.8"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#3a8fd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17 8 12 3 7 8" stroke="#3a8fd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="3" x2="12" y2="15" stroke="#3a8fd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState('')

async function handleSignup() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/signup', {
      fullName: fullName,
      email: email,
      password: password
    })
    // save email for verify page
    localStorage.setItem('verifyEmail', email)
    // go to verify email page instead of home
    navigate('/verify-email')
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong!')
  }
}

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const focusStyle = (e) => (e.target.style.borderColor = "#60b8f5");
  const blurStyle = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.6)");

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

        {/* Heading */}
        <h1 style={styles.heading}>Welcome to CONNECTO!<br />Create your account</h1>
        <p style={styles.subheading}>Create your account to start connecting</p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ ...styles.input, marginBottom: 12 }}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        {/* Upload Profile Photo */}
        {/* <div style={styles.uploadRow}>
          <div style={styles.avatarCircle}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="profile" style={styles.avatarImg} />
            ) : (
              <CameraIcon />
            )}
          </div>
          <span style={styles.uploadLabel}>
            Upload Profile Photo<br />
            <span style={styles.optional}>(Optional)</span>
          </span>
          <button style={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
            <UploadIcon />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
        </div> */}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, marginBottom: 12 }}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />

        {/* Password */}
        <div style={styles.inputWrap}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <span onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password */}
        <div style={{ ...styles.inputWrap, marginBottom: 4 }}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Sign Up Button */}
        <button style={styles.signupBtn} onClick={handleSignup}>SIGN UP</button>
{error && <p style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{error}</p>}


        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Social Buttons */}
        <button style={styles.socialBtn}>
          <GoogleIcon />
          <span style={{ marginLeft: 10 }}>Sign up with Google</span>
        </button>

        <button style={styles.socialBtn}>
          <FacebookIcon />
          <span style={{ marginLeft: 10 }}>Facebook</span>
        </button>

        {/* Login link */}
        <p style={styles.loginText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}
           style = {styles.login}>


            Login
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
  { top: "6%", left: "5%", animationDelay: "0s" },
  { top: "12%", right: "6%", animationDelay: "0.8s" },
  { top: "42%", left: "1%", animationDelay: "1.4s", width: 40, height: 40 },
  { bottom: "18%", left: "10%", animationDelay: "0.4s", width: 55, height: 55 },
  { bottom: "10%", right: "4%", animationDelay: "1s", width: 65, height: 65 },
  { top: "58%", right: "9%", animationDelay: "1.8s", width: 40, height: 40 },
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
    padding: "36px 44px",
    width: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 14,
  },
  logoText: {
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: 3,
    color: "#2d7bbf",
    marginTop: 5,
  },
  heading: {
    fontSize: 17,
    fontWeight: 800,
    color: "#1a3a5c",
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 1.4,
  },
  subheading: {
    fontSize: 13,
    color: "#6b8caa",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "13px 18px",
    borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.65)",
    fontSize: 14,
    color: "#2d4a6a",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'Nunito', sans-serif",
  },
  inputWrap: {
    position: "relative",
    width: "100%",
    marginBottom: 12,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: 15,
    userSelect: "none",
  },
  uploadRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.65)",
    border: "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: 12,
    padding: "10px 14px",
    marginBottom: 12,
    gap: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(200,230,250,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    border: "2px solid rgba(96,184,245,0.4)",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  uploadLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: "#2d4a6a",
    lineHeight: 1.4,
  },
  optional: {
    fontSize: 12,
    fontWeight: 400,
    color: "#8aabcc",
  },
  uploadBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: "1.5px solid rgba(96,184,245,0.5)",
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  signupBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "linear-gradient(90deg, #60b8f5, #3a8fd8)",
    color: "white",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 2,
    border: "none",
    cursor: "pointer",
    marginTop: 6,
    marginBottom: 14,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 4px 16px rgba(58,143,216,0.35)",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "rgba(100,160,210,0.25)",
  },
  dividerText: {
    fontSize: 12,
    color: "#8aabcc",
    fontWeight: 600,
    letterSpacing: 1,
  },
  socialBtn: {
    width: "100%",
    padding: "11px 18px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.75)",
    border: "1.5px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    color: "#2d4a6a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 2px 8px rgba(100,160,220,0.1)",
  },
  loginText: {
    fontSize: 13,
    color: "#6b8caa",
    marginTop: 4,
  },
  loginLink: {
    color: "#3a8fd8",
    fontWeight: 700,
    textDecoration: "none",
  },
};
