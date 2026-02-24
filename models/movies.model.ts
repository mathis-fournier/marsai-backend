const db = require("../config/database");
import { Movie, RatingData } from "../interfaces/movies.interfaces";

const postMovie = (data: Movie, callback: (err: any, results: any) => void) => {
  const query = "INSERT INTO movie SET ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

const getAllMovies = (
  limit: number,
  offset: number,
  callback: (err: any, results: any) => void,
) => {
  const query = "SELECT * FROM movie LIMIT ? OFFSET ?";
  db.query(query, [limit, offset], (err: any, results: any) => {
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
    LIMIT 3
  `;
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

const getMoviesSum = (callback: (err: any, results: any) => void) => {
  const query = "SELECT COUNT(*) as total FROM movie";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    const total = results[0].total;
    callback(null, total);
  });
};

const getMovieDetails = (
  movieId: number | undefined,
  callback: (err: any, results: any) => void,
) => {
  const query = "SELECT * FROM movie m WHERE m.id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const getMovieCollaborators = (
  movieId: number | undefined,
  callback: (err: any, results: any) => void,
) => {
  const query = "SELECT * FROM collaborator WHERE movie_id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const getMovieRatings = (
  movieId: number,
  callback: (err: any, results: any) => void,
) => {
  const query = "SELECT * FROM rating WHERE movie_id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const postMovieRating = (
  ratingData: RatingData,
  callback: (err: any, results: any) => void,
) => {
  const sql = "INSERT INTO rating SET ?";
  db.query(sql, [ratingData]);
};

const getMovieTags = (
  movieId: number,
  callback: (err: any, results: any) => void,
) => {
  const query = `
    SELECT t.name
    FROM movie_tag mt
    JOIN tag t ON mt.tag_id = t.id
    WHERE mt.movie_id = ?
  `;
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const getDirectorsSum = (callback: (err: any, results: any) => void) => {
  const query =
    "SELECT COUNT(*) as total FROM collaborator WHERE job = 'Director'";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    const total = results[0].total;
    callback(null, total);
  });
};

const changeMovieStatus = (
  [status, id]: any,
  callback: (err: any, results: any) => void,
) => {
  const query = "UPDATE movie SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    callback(err, results);
  });
};

export default {
  postMovie,
  getAllMovies,
  getBestMovies,
  getMoviesSum,
  getMovieDetails,
  getMovieRatings,
  getMovieTags,
  getMovieCollaborators,
  getDirectorsSum,
  postMovieRating,
  changeMovieStatus,
};
