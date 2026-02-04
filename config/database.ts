import mysql from "mysql2";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.error(
    "Missing required environment variables for database connection.",
  );
  process.exit(1);
}

const connection = mysql.createConnection({
  host: DB_HOST as string,
  user: DB_USER as string,
  password: DB_PASSWORD as string,
  database: DB_NAME as string,
  port: Number(process.env.DB_PORT),
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
