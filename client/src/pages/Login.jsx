import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
=======
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      return setError("Please enter both email and password.");
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
<<<<<<< HEAD
        setLoading(false);
=======
        setLoading(false); // ✅ stop loading
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
        return;
      }

      navigate("/home");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: '28rem' }}
      >
        <motion.form
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            padding: '2rem'
          }}
          onSubmit={handleLogin}
          variants={itemVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(to right, #f97316, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}
            >
              <FaLock style={{ color: 'white', fontSize: '1.5rem' }} />
            </motion.div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              Welcome Back
            </h2>
            <p style={{ color: '#9ca3af' }}>Sign in to your account</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                padding: '1rem',
                color: '#fca5a5',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Email Input */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                zIndex: 1
              }} />
              <input
                type="email"
                placeholder="Email address"
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  paddingRight: '1rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onChange={(e) => setEmail(e.target.value.trim())}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f97316';
                  e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <FaLock style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                zIndex: 1
              }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f97316';
                  e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  zIndex: 1
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#6b7280' : 'linear-gradient(to right, #f97316, #ea580c)',
              color: 'white',
              fontWeight: '600',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '1.5rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(to right, #ea580c, #c2410c)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>

          {/* Links */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: '#f97316',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ea580c'}
                onMouseLeave={(e) => e.target.style.color = '#f97316'}
              >
                Sign Up
              </Link>
            </p>
            <Link
              to="/forgot-password"
              style={{
                color: '#f97316',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ea580c'}
              onMouseLeave={(e) => e.target.style.color = '#f97316'}
            >
              Forgot your password?
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
=======
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/" style={{textDecoration : 'none' , fontWeight : 'bold'}}>Sign Up</Link>
        </p>

        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

      </form>
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb
    </div>
  );
}

export default Login;
