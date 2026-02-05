import "dotenv/config";
import "./config/database";
import express, { Request, Response, Application } from "express";
import path from "path";
import cors, { CorsOptions } from "cors";

// Import Routes
import movieRoutes from "./routes/movies.routes";
import testRoutes from "./routes/test.routes";
import eventsRoutes from "./routes/events.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import subscribersRoutes from "./routes/subscribers.routes";
import juryRoutes from "./routes/jury.routes";

const app = express();

app.use(express.json());

const whitelist: (string | undefined)[] = [process.env.FRONT_URL];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in whitelist
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    // Autoriser les adresses IP locales pour le développement mobile
    if (
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://192.168.")
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/test", testRoutes);
app.use("/events", eventsRoutes);
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/newsletter", subscribersRoutes);
app.use("/jury", juryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
