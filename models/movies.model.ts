const db = require("../config/database");
import { Movie } from "../interfaces/movies.interfaces";

const postMovie = (data: Movie, callback: (err: any, results: any) => void) => {
  const query = "INSERT INTO movie set?";
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
  const query = "SELECT * FROM movie ORDER BY rating DESC LIMIT 3";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};
module.exports = { postMovie, getAllMovies, getBestMovies };
  