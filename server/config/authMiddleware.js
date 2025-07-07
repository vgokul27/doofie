import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.resolve(__dirname, "./firebase-admin-key.json") // path to your JSON
    )
  });
}

// 🔐 Middleware: verify Firebase token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // user info like email, uid
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 👑 Middleware: only allow Admin (you)
export const verifyAdmin = async (req, res, next) => {
  if (req.user?.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Only admin can access this route" });
  }
  next();
};
