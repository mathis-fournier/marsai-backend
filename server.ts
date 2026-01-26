require("dotenv").config();
require("./config/database");
import express, { Request, Response } from "express";

const app = express();
const cors = require("cors");

const testRoutes = require("./routes/test.routes");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/example", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/test", testRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});