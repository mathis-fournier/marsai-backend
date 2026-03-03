import { db } from "../config/database";

// Fonction pour récupérer tous les tags disponibles
const getAllTagsAvailable = async () => {
  const query = `SELECT * FROM tag`;
  const [rows] = await db.query(query);
  return rows;
};

// Fonction pour insérer un nouveau tag et l'associer à un film
const insertTag = async (tagname: string, movie_id: number) => {
  if (!tagname || !movie_id) {
    throw new Error("Invalid input");
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const insertTagQuery = `INSERT INTO tag (name) VALUES (?)`;
    const [tagResult]: any = await connection.query(insertTagQuery, [tagname]);
    const lastInsertedId = tagResult.insertId;

    const insertMovieTagQuery = `INSERT INTO movie_tag (movie_id, tag_id) VALUES (?, ?)`;
    const [movieTagResult] = await connection.query(insertMovieTagQuery, [
      movie_id,
      lastInsertedId,
    ]);

    await connection.commit();
    return movieTagResult;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  getAllTagsAvailable,
  insertTag,
};
