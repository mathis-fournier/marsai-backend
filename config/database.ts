import mysql from "mysql2";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error(
    "Missing required environment variables for database connection.",
  );
  process.exit(1);
}

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Test de connexion
connection.connect((error) => {
  if (error) {
    console.error("Erreur de connexion à MySQL :", error.message);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

module.exports = connection;
