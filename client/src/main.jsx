import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"; // ✅
import { AuthProvider } from "./context/AuthContext";

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

