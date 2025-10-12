import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaUtensils,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

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
    } catch {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaUtensils className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-lg">
            We'll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="card p-8 space-y-6">
          <form onSubmit={handleReset} className="space-y-6">
            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-3" />
                  <p className="text-green-700 font-medium">{message}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-400 mr-3" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <FaEnvelope className="mr-2 text-gray-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your email address"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary text-lg py-4">
              <div className="flex items-center justify-center space-x-2">
                <FaEnvelope />
                <span>Send Reset Link</span>
              </div>
            </button>

            {/* Back to Login */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-200"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            You'll receive an email with instructions to reset your password
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
