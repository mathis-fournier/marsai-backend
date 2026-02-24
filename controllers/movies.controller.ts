const db = require("../config/database");
import { Request, Response } from "express";
import { Movie, RatingData } from "../interfaces/movies.interfaces";
import movieModel from "../models/movies.model";
import tagsModel from "../models/tags.model";

const addMovie = (req: Request, res: Response) => {
  const file = (req as any).file;
  const isHybrid = req.body.isHybrid === "true";
  const hasSubs = req.body.hasSubs === "true";
  const newMovie: Movie = {
    original_title: req.body.original_title,
    english_title: req.body.english_title,
    youtube_url: req.body.youtube_url,
    cover_image: file
      ? "http://localhost:3000/uploads/" + file.filename
      : "/assets/batman.png",
    duration: parseInt(req.body.duration),
    is_hybrid: isHybrid,
    original_language: req.body.original_language,
    original_synopsis: req.body.original_synopsis,
    english_synopsis: req.body.english_synopsis,
    creative_process: req.body.creative_process,
    ia_tools: req.body.ia_tools,
    has_subs: hasSubs,
  };
  movieModel.postMovie(newMovie, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res
      .status(201)
      .json({ message: "Film ajouté avec succès", id: results.insertId });
  });
};

const getAllMovies = (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;

  movieModel.getAllMovies(limit, offset, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getBestMovies = (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;

  // Appel à la fonction getBestMovies
  movieModel.getBestMovies(limit, offset, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getMoviesSum = (req: Request, res: Response) => {
  movieModel.getMoviesSum((err: any, total: any) => {
    if (err) {
      return res.status(500).json({
        error: "Erreur de base de données lors de la récupération du total.",
      });
    }
    res.json({ total });
  });
};

const getMovieDetails = (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  movieModel.getMovieDetails(movieId, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getMovieCollaborators = (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  movieModel.getMovieCollaborators(movieId, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DETAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getMovieRatings = (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  movieModel.getMovieRatings(movieId, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getMovieTags = (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  movieModel.getMovieTags(movieId, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getDirectorsSum = (req: Request, res: Response) => {
  movieModel.getDirectorsSum((err: any, total: any) => {
    if (err) {
      return res.status(500).json({
        error: "Erreur de base de données lors de la récupération du total.",
      });
    }
    res.json({ total });
  });
};

const postMovieRating = (req: Request, res: Response) => {
  const { ratingData } = req.body;

  movieModel.postMovieRating(ratingData, (err: Error, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res
      .status(201)
      .json({ message: "Note ajoutée avec succès", id: results.insertId });
  });
};

const changeMovieStatus = (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  movieModel.changeMovieStatus([status, id], (err: Error, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(201).json({ message: "Status changé avec succes" });
  });
};

const getAllMoviesByTag = (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;

  movieModel.getAllMoviesByTag(
    tag,
    limit,
    offset,
    (err: Error | null, results: any) => {
      try {
        if (err) return res.status(500).send("Erreur SQL : " + err.message);
        return res.status(200).json(results);
      } catch (error: any) {
        console.error("Unexpected error : " + error.message);
        return res.status(500).send(" inattendue : " + error.message);
      }
    },
  );
};
const getSelectedMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;

  try {
    const results = await movieModel.getSelectedMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getSelectedMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const tag = parseInt(req.params.tag as string, 10);
  const offset = (page - 1) * limit;

  try {
    const results = await movieModel.getSelectedMoviesByTag(tag, limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getPendingMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getPendingMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingMoviesByTag(tag, limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getRejectedMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;

  try {
    const results = await movieModel.getRejectedMovies(limit, offset);
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur Serveur : " + err.message });
  }
};
const getRejectedMoviesCount = async (req: Request, res: Response) => {
  try {
    const results = await movieModel.getRejectedMoviesCount();
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur Serveur : " + err.message });
  }
};
const getHybridCount = async (req: Request, res: Response) => {
  try {
    const results = await movieModel.getHybridCount();
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur Serveur : " + err.message });
  }
};
const getFullAICount = async (req: Request, res: Response) => {
  try {
    const results = await movieModel.getFullAICount();
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur Serveur : " + err.message });
  }
};
async function getHybridMovies(
  req: Request,
  res: Response,
  limit: number,
  page: number,
) {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getHybrid(limit, offset);
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
}
async function getFullAIMovies(
  req: Request,
  res: Response,
  limit: number,
  page: number,
) {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getFullAI(limit, offset);
    res.status(200).json(results);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
}
export default {
  addMovie,
  getAllMovies,
  getAllMoviesByTag,
  getBestMovies,
  getSelectedMovies,
  getSelectedMoviesByTag,
  getPendingMovies,
  getPendingMoviesByTag,
  getRejectedMovies,
  getRejectedMoviesCount,
  getHybridMovies,
  getHybridCount,
  getFullAIMovies,
  getFullAICount,
  getMoviesSum,
  getMovieDetails,
  getMovieRatings,
  getMovieTags,
  getMovieCollaborators,
  getDirectorsSum,
  postMovieRating,
  changeMovieStatus,
};
