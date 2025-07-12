import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/global.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setVerifyMsg("");

    if (!email || !password || !confirmPass) {
      return setError("All fields are required.");
    }
    if (password !== confirmPass) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      setUser(createdUser);

      await sendEmailVerification(createdUser);
      setVerifyMsg("Verification email sent. Please check your inbox.");

      // Optionally disable form or redirect only after verifying
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(createdUser, {
        url: "http://localhost:5173/login", // ✅ Your front-end route
        handleCodeInApp: false
        });
        setVerifyMsg("Verification email sent. Please check your inbox.");

      } catch (err) {
        setError("Failed to resend verification email.");
      }
    } else {
      setError("No user found to resend verification.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignUp}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        {verifyMsg && <p className="success">{verifyMsg}</p>}

        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {user && (
          <button
            type="button"
            onClick={handleResendVerification}
            className="resend-btn"
          >
            Resend Verification Email
          </button>
        )}

        <p>
          Already have an account? <Link to="/login" style={{textDecoration : 'none' , fontWeight : 'bold'}}>Login</Link>
        </p>
      </form>
    </div>
    
  );
}

export default SignUp;
