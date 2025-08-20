import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
<<<<<<< HEAD
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
=======
import ErrorBoundary from "./components/ErrorBoundary"; // ✅
import { AuthProvider } from "./context/AuthContext";
>>>>>>> 0ac0eaab49ef9dd1d70312cbcba3ece64b1ea6cb

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider> {/* ✅ This makes useAuth() work */}
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
    
  </React.StrictMode>
);

