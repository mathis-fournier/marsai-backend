require("dotenv").config();
require("./config/database");
import express, { Request, Response } from "express";

const app = express();
const cors = require("cors");

const testRoutes = require("./routes/test.routes");
const eventsRoutes = require("./routes/events.routes");
const movieRoutes = require("./routes/movies.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(express.json());
const whitelist = [process.env.FRONT_URL];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    // Autoriser les requêtes sans origin (comme Postman ou les apps mobiles)
    if (!origin) {
      return callback(null, true);
    }

    // Vérifier si l'origine est dans la whitelist
    if (whitelist.indexOf(origin) !== -1) {
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

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
