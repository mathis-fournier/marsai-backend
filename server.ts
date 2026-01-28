require("dotenv").config();
require("./config/database");
import express, { Request, Response } from "express";

const app = express();
const cors = require("cors");

const testRoutes = require("./routes/test.routes");
const eventsRoutes = require("./routes/events.routes");
const movieRoutes = require("./routes/movies.routes");

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);

app.get("/example", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/test", testRoutes);
app.use("/events", eventsRoutes);
app.use("/movies", movieRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
