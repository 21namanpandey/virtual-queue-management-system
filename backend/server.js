import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import config from "./config/config.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [config.CLIENT_URL];

if (config.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:5173");
}

const corsOptions = {
  origin: allowedOrigins, 
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(config.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
