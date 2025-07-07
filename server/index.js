import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
import recipeRoutes from "./routes/recipeRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";
app.use("/api/recipes", recipeRoutes);
app.use("/api/apikey", apiKeyRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });
