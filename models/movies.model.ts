const db = require("../config/database");
import { Tag } from "../interfaces/tag.interface";
import * as moviesInterfaces from "../interfaces/movies.interfaces";
import { Collaborator } from "../interfaces/collaborator.interface";

const executeQuery = (query: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err: any, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const postMovie = (
  data: moviesInterfaces.Movie,
  callback: (err: any, results: any) => void,
) => {
  const query = "INSERT INTO movie SET ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

const getAllMovies = (
  limit: number,
  offset: number,
  callback: (err: any, results: moviesInterfaces.Movie[]) => void,
) => {
  const query = "SELECT * FROM movie LIMIT ? OFFSET ?";
  db.query(query, [limit, offset], (err: any, results: any) => {
    callback(err, results);
  });
};

const getBestMovies = (
  limit: number,
  offset: number,
  callback: (err: any, results: moviesInterfaces.Movie[]) => void,
) => {
  const query = `
    SELECT m.*, AVG(r.note) AS average_rating
    FROM movie AS m
    JOIN rating AS r ON m.id = r.movie_id
    GROUP BY m.id
    ORDER BY average_rating DESC
    LIMIT ? OFFSET ?`;
  db.query(query, [limit, offset], (err: any, results: any) => {
    callback(err, results);
  });
};

const getSelectedMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Accepted' LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};

const getSelectedMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT * FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? AND movie.status = 'Accepted' LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};
const getPendingMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Pending' LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films en attente : " + error.message,
    );
  }
};
const getPendingMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Pending' LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films en attente : " + error.message,
    );
  }
};
const getPendingHybridMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Pending' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides en attente : " +
        error.message,
    );
  }
};
const getPendingFullAIMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Pending' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI en attente : " +
        error.message,
    );
  }
};
const getPendingHybridMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Pending' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films en attente : " + error.message,
    );
  }
};
const getPendingFullAIMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Pending' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films en attente : " + error.message,
    );
  }
};
const getSelectedHybridMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Accepted' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};
const getSelectedFullAIMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Accepted' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};
const getSelectedHybridMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Accepted' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides acceptés : " +
        error.message,
    );
  }
};
const getSelectedFullAIMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Accepted' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI acceptés : " +
        error.message,
    );
  }
};
const getRejectedHybridMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Cancelled' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides rejetés : " +
        error.message,
    );
  }
};
const getRejectedFullAIMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Cancelled' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI rejetés : " +
        error.message,
    );
  }
};
const getRejectedHybridMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Cancelled' AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides rejetés : " +
        error.message,
    );
  }
};
const getRejectedFullAIMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Cancelled' AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI rejetés : " +
        error.message,
    );
  }
};

const getMoviesSum = (callback: (err: any, results: number) => void) => {
  const query = "SELECT COUNT(*) as total FROM movie";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, 0);
    }
    const total = results[0].total;
    callback(null, total);
  });
};

const getMovieDetails = (
  movieId: number | undefined,
  callback: (err: any, results: moviesInterfaces.Movie) => void,
) => {
  const query = "SELECT * FROM movie m WHERE m.id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const getMovieCollaborators = (
  movieId: number | undefined,
  callback: (err: any, results: Collaborator[]) => void,
) => {
  const query = "SELECT * FROM collaborator WHERE movie_id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const getMovieRatings = (
  movieId: number,
  callback: (err: any, results: moviesInterfaces.RatingData[]) => void,
) => {
  const query = "SELECT * FROM rating WHERE movie_id = ?";
  db.query(query, [movieId], (err: any, results: any) => {
    callback(err, results);
  });
};

const postMovieRating = (
  ratingData: moviesInterfaces.RatingData,
  callback: (err: any, results: any) => void,
) => {
  const sql = "INSERT INTO rating SET ?";
  db.query(sql, [ratingData], (err: any, results: any) => {
    callback(err, results);
  });
};

const getMovieTags = (
  movieId: number,
  callback: (err: any, results: Tag[]) => void,
) => {
  const query = `
    SELECT t.name
    FROM movie_tag mt
    JOIN tag t ON mt.tag_id = t.id
    WHERE mt.movie_id = ?
  `;
  db.query(query, [movieId], (err: any, results: any) => {
    if (err) callback(err, []);
    else callback(err, results);
  });
};

const getDirectorsSum = (callback: (err: any, results: number) => void) => {
  const query = "SELECT COUNT(*) as total FROM collaborator";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, 0);
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
function getAllMoviesByTag(
  tag: number,
  limit: number,
  offset: number,
  callback: (err: Error | null, results: any) => void,
) {
  const query =
    "SELECT movie.* FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? LIMIT ? OFFSET ?";
  db.query(query, [tag, limit, offset], (err: any, results: any) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function getAllMoviesByLimit(
  limit: number,
  offset: number,
  callback: (err: Error | null, results: any) => void,
) {
  const query = "SELECT movie.* FROM movie LIMIT ? OFFSET ?";
  db.query(query, [limit, offset], (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}
const getRejectedMovies = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Cancelled' LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getRejectedMoviesCount = async (): Promise<{ total: number }[]> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.status = 'Cancelled'`;
  try {
    return await executeQuery(query);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getHybridCount = async (): Promise<{ total: number }[]> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.is_hybrid = true`;
  try {
    return await executeQuery(query);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération du nombre de films hybrides : " +
        error.message,
    );
  }
};
const getFullAICount = async (): Promise<{ total: number }[]> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.is_hybrid = false`;
  try {
    return await executeQuery(query);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération du nombre de films full AI : " +
        error.message,
    );
  }
};

const getHybrid = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT * FROM movie WHERE is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides : " + error.message,
    );
  }
};

const getHybridByTag = async (
  limit: number,
  offset: number,
  tag: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT * FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? AND is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films hybrides par tag : " +
        error.message,
    );
  }
};
const getFullAI = async (
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT * FROM movie WHERE is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI : " + error.message,
    );
  }
};
const getFullAIByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<moviesInterfaces.Movie[]> => {
  const query = `SELECT * FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? AND is_hybrid = false LIMIT ? OFFSET ?`;
  try {
    return await executeQuery(query, [tag, limit, offset]);
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films full AI par tag : " +
        error.message,
    );
  }
};
export default {
  postMovie,
  getAllMovies,
  getAllMoviesByTag,
  getAllMoviesByLimit,
  getMovieTags,
  getBestMovies,
  getSelectedMovies,
  getSelectedMoviesByTag,
  getSelectedHybridMovies,
  getSelectedFullAIMovies,
  getSelectedHybridMoviesByTag,
  getSelectedFullAIMoviesByTag,
  getPendingMovies,
  getPendingMoviesByTag,
  getPendingHybridMovies,
  getPendingFullAIMovies,
  getPendingHybridMoviesByTag,
  getPendingFullAIMoviesByTag,
  getRejectedMovies,
  getRejectedMoviesCount,
  getRejectedHybridMovies,
  getRejectedFullAIMovies,
  getRejectedHybridMoviesByTag,
  getRejectedFullAIMoviesByTag,
  getHybrid,
  getHybridByTag,
  getFullAI,
  getFullAIByTag,
  getHybridCount,
  getFullAICount,
  getMoviesSum,
  getMovieDetails,
  getMovieRatings,
  getMovieCollaborators,
  getDirectorsSum,
  postMovieRating,
  changeMovieStatus,
};
