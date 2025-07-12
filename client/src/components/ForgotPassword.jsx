import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import "../styles/global.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        <p>
          Go back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
