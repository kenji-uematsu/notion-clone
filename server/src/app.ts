import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import documentRoutes from "./routes/documentRoutes";
import errorHandler from "./middleware/errorHandler";
import { config } from "dotenv";
import sequelize from "./config/database";

config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default app;
