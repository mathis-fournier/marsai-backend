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

const getBestMovies = (
  limit: number,
  offset: number,
  callback: (err: any, results: any) => void,
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
): Promise<any> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Accepted' LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
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
): Promise<any> => {
  const query = `SELECT * FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? AND movie.status = 'Accepted' LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [tag, limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};
const getPendingMovies = async (
  limit: number,
  offset: number,
): Promise<any> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Pending' LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films acceptés : " + error.message,
    );
  }
};
const getPendingMoviesByTag = async (
  tag: number,
  limit: number,
  offset: number,
): Promise<any> => {
  const query = `SELECT m.* FROM movie AS m JOIN movie_tag ON movie_tag.movie_id = m.id WHERE movie_tag.tag_id = ? AND m.status = 'Pending' LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [tag, limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films en attente : " + error.message,
    );
  }
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
  db.query(sql, [ratingData], (err: any, results: any) => {
    callback(err, results);
  });
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
    if (err) callback(err, null);
    else callback(err, results);
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
function getAllMoviesByTag(
  tag: number,
  limit: number,
  offset: number,
  callback: (err: Error | null, results: any) => void,
) {
  const query =
    "SELECT movie.* FROM movie JOIN movie_tag ON movie_tag.movie_id = movie.id WHERE movie_tag.tag_id = ? LIMIT ? OFFSET ?";
  db.query(query, [tag, limit, offset], (err: Error, results: any) => {
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
  db.query(query, [limit, offset], (err: Error, results: any) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}
const getRejectedMovies = async (
  limit: number,
  offset: number,
): Promise<any> => {
  const query = `SELECT m.* FROM movie AS m WHERE m.status = 'Cancelled' LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getRejectedMoviesCount = async (): Promise<any> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.status = 'Cancelled'`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getHybridCount = async (): Promise<any> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.is_hybrid = true`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getFullAICount = async (): Promise<any> => {
  const query = `SELECT COUNT(*) as total FROM movie WHERE movie.is_hybrid = false`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};

const getHybrid = async (limit: number, offset: number) => {
  const query = `SELECT * FROM movie WHERE is_hybrid = true LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
    );
  }
};
const getFullAI = async (limit: number, offset: number) => {
  const query = `SELECT * FROM movie WHERE is_hybrid = 0 LIMIT ? OFFSET ?`;
  try {
    return await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err: any, results: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error: any) {
    throw new Error(
      "Erreur lors de la récupération des films annulés : " + error.message,
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
  getPendingMovies,
  getPendingMoviesByTag,
  getRejectedMovies,
  getRejectedMoviesCount,
  getHybrid,
  getFullAI,
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
