require("dotenv").config();
require("./config/database");
const express = require("express");
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

app.get("/example", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/test", testRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
