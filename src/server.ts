import express, { NextFunction } from "express";
import dotenv from "dotenv";
import { syncDatabase } from "./models";
import lostRoutes from "./routes/lostRoutes";
import foundRoutes from "./routes/foundRoutes";
import locationRoutes from "./routes/locationRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

import rateLimit from "express-rate-limit";

// Apply to all requests
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
  message: "Too many requests, please try again later.",
});

app.use(limiter);

// Routes
app.use("/lost", lostRoutes);
app.use("/found", foundRoutes);
app.use("/locations", locationRoutes);
// Sync database and start server
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
