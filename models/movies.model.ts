const db = require("../config/database");
import { Movie } from "../interfaces/movies.interfaces";

const postMovie = (data: Movie, callback: (err: any, results: any) => void) => {
  const query = "INSERT INTO movie SET ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

const getAllMovies = (callback: (err: any, results: any) => void) => {
  const query = "SELECT * FROM movie";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

const getBestMovies = (callback: (err: any, results: any) => void) => {
  const query = `
    SELECT m.*, AVG(r.note) AS average_rating
    FROM movie AS m
    JOIN rating AS r ON m.id = r.movie_id
    GROUP BY m.id
    ORDER BY average_rating DESC
    LIMIT 4
  `;
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

const getMoviesSum = (callback: (err: any, results: any) => void) => {
  const query = "SELECT COUNT(*) as total FROM movie";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

export default { postMovie, getAllMovies, getBestMovies, getMoviesSum };
