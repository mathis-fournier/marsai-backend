import "dotenv/config";
import "./config/database";
import express, { Request, Response, Application } from "express";
import cors, { CorsOptions } from "cors";

// Import Routes
import movieRoutes from "./routes/movies.routes";
import testRoutes from "./routes/test.routes";
import eventsRoutes from "./routes/events.routes";

const testRoutes = require("./routes/test.routes");
const eventsRoutes = require("./routes/events.routes");
const movieRoutes = require("./routes/movies.routes");
const adminRoutes = require("./routes/admin.routes");

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

app.get("/example", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/test", testRoutes);
app.use("/events", eventsRoutes);
app.use("/movies", movieRoutes);
app.use("/admin", adminRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
