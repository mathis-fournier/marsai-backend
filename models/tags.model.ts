import { Movie } from "../interfaces/movies.interfaces";

const db = require("../config/database");

// Fonction pour récupérer tous les tags disponibles
const getAllTagsAvailable = (callback: (err: Error, results: any) => void) => {
  const query = `SELECT * FROM tag`; // Requête SQL pour sélectionner tous les tags
  db.query(query, (err: Error, results: any) => {
    // Exécution de la requête
    if (err)
      callback(err, null); // Si une erreur se produit, appeler le callback avec l'erreur
    else callback(err, results); // Sinon, appeler le callback avec les résultats
  });
};

// Fonction pour insérer un nouveau tag et l'associer à un film
const insertTag = (
  tagname: string,
  movie_id: number,
  callback: (err: Error, results: any) => void,
) => {
  if (!tagname || !movie_id) {
    // Vérifier si les entrées sont valides
    return callback(new Error("Invalid input"), null); // Si non, appeler le callback avec une erreur
  }

  db.beginTransaction((err: Error) => {
    // Commencer une transaction
    if (err) return callback(err, null); // Si une erreur se produit lors de la transaction, appeler le callback avec l'erreur

    const insertTagQuery = `INSERT INTO tag (name) VALUES (?)`; // Requête SQL pour insérer un nouveau tag
    db.query(insertTagQuery, [tagname], (err: Error, results: any) => {
      // Exécution de la requête
      if (err) {
        return db.rollback(() => callback(err, null)); // Si une erreur se produit, annuler la transaction et appeler le callback avec l'erreur
      }

      const lastInsertedId = results.insertId; // Récupérer l'ID du tag inséré
      const insertMovieTagQuery = `INSERT INTO movie_tag (movie_id, tag_id) VALUES (?, ?)`; // Requête SQL pour associer le tag au film
      db.query(
        insertMovieTagQuery,
        [movie_id, lastInsertedId],
        (err: Error, results: any) => {
          if (err) {
            return db.rollback(() => callback(err, null)); // Si une erreur se produit, annuler la transaction et appeler le callback avec l'erreur
          }

          db.commit((err: Error) => {
            // Valider la transaction
            if (err) {
              return db.rollback(() => callback(err, null)); // Si une erreur se produit lors de la validation, annuler la transaction et appeler le callback avec l'erreur
            }
            console.log(results); // Afficher les résultats
            callback(err, results); // Appeler le callback avec les résultats
          });
        },
      );
    });
  });
};

export default {
  getAllTagsAvailable,
  insertTag,
}; // Exporter les fonctions
