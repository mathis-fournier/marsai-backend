import { Request, Response } from "express";
import { Movie, RatingData } from "../interfaces/movies.interfaces";
import movieModel from "../models/movies.model";

const addMovie = async (req: Request, res: Response) => {
  try {
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
    const results: any = await movieModel.postMovie(newMovie);
    res
      .status(201)
      .json({ message: "Film ajouté avec succès", id: results.insertId });
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getAllMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getAllMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getBestMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getBestMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getMoviesSum = async (req: Request, res: Response) => {
  try {
    const total = await movieModel.getMoviesSum();
    res.json({ total });
  } catch (error: any) {
    return res.status(500).json({
      error: "Erreur de base de données lors de la récupération du total.",
    });
  }
};

const getMovieDetails = async (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const results = await movieModel.getMovieDetails(movieId);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getMovieCollaborators = async (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const results = await movieModel.getMovieCollaborators(movieId);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DETAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getMovieRatings = async (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const results = await movieModel.getMovieRatings(movieId);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getMovieTags = async (req: any, res: Response) => {
  const movieId = req.params.id ? parseInt(req.params.id, 10) : undefined;
  if (movieId === undefined || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie ID" });
  }
  try {
    const results = await movieModel.getMovieTags(movieId);
    res.status(200).json(results);
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getDirectorsSum = async (req: Request, res: Response) => {
  try {
    const total = await movieModel.getDirectorsSum();
    res.json({ total });
  } catch (error: any) {
    return res.status(500).json({
      error: "Erreur de base de données lors de la récupération du total.",
    });
  }
};

const postMovieRating = async (req: any, res: Response) => {
  const { note, comment, movie_id, user_id } = req.body;

  const ratingData: RatingData = {
    note: note,
    comment: comment,
    user_id: user_id,
    movie_id: movie_id,
  };

  try {
    const results: any = await movieModel.postMovieRating(ratingData);
    res
      .status(201)
      .json({ message: "Note ajoutée avec succès", id: results.insertId });
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const changeMovieStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await movieModel.changeMovieStatus([status, id]);
    res.status(201).json({ message: "Status changé avec succes" });
  } catch (error: any) {
    console.error("ERREUR SQL DÉTAILLÉE :", error.message);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

const getAllMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getAllMoviesByTag(tag, limit, offset);
    return res.status(200).json(results);
  } catch (err: any) {
    console.error("Unexpected error : " + err.message);
    return res.status(500).send("Erreur inattendue : " + err.message);
  }
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
  tag: number,
) => {
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
const getPendingHybridMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingHybridMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getPendingFullAIMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingFullAIMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getPendingHybridMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingHybridMoviesByTag(
      tag,
      limit,
      offset,
    );
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getPendingFullAIMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getPendingFullAIMoviesByTag(
      tag,
      limit,
      offset,
    );
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getSelectedHybridMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getSelectedHybridMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getSelectedFullAIMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getSelectedFullAIMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getSelectedHybridMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getSelectedHybridMoviesByTag(
      tag,
      limit,
      offset,
    );
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getSelectedFullAIMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getSelectedFullAIMoviesByTag(
      tag,
      limit,
      offset,
    );
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getRejectedHybridMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getRejectedHybridMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getRejectedFullAIMovies = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getRejectedFullAIMovies(limit, offset);
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getRejectedHybridMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getRejectedHybridMoviesByTag(
      tag,
      limit,
      offset,
    );
    res.status(200).json(results);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erreur de base de données : " + error.message });
  }
};
const getRejectedFullAIMoviesByTag = async (
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) => {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getRejectedFullAIMoviesByTag(
      tag,
      limit,
      offset,
    );
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
async function getHybridMoviesByTag(
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getHybridByTag(limit, offset, tag);
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
async function getFullAIMoviesByTag(
  req: Request,
  res: Response,
  limit: number,
  page: number,
  tag: number,
) {
  const offset = (page - 1) * limit;
  try {
    const results = await movieModel.getFullAIByTag(limit, offset, tag);
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
  getSelectedHybridMovies,
  getSelectedFullAIMovies,
  getSelectedHybridMoviesByTag,
  getSelectedFullAIMoviesByTag,
  getPendingMovies,
  getPendingHybridMovies,
  getPendingFullAIMovies,
  getPendingHybridMoviesByTag,
  getPendingFullAIMoviesByTag,
  getPendingMoviesByTag,
  getRejectedMovies,
  getRejectedHybridMovies,
  getRejectedFullAIMovies,
  getRejectedHybridMoviesByTag,
  getRejectedFullAIMoviesByTag,
  getRejectedMoviesCount,
  getHybridMovies,
  getHybridMoviesByTag,
  getHybridCount,
  getFullAIMovies,
  getFullAIMoviesByTag,
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
