const db = require("../config/database");
import { Request, Response } from "express";
import { Movie } from "../interfaces/movies.interfaces";
import movieModel from "../models/movies.model";

const addMovie = (req: Request, res: Response) => {
  const file = (req as any).file;
  const newMovie: Movie = {
    original_title: req.body.original_title,
    english_title: req.body.english_title,
    youtube_url: req.body.youtube_url,
    cover_image: file ?? "/assets/batman.png",
    duration: parseInt(req.body.duration),
    is_hybrid: req.body.isHybrid === "true" || req.body.isHybrid === true,
    original_language: req.body.original_language,
    original_synopsis: req.body.original_synopsis,
    english_synopsis: req.body.english_synopsis,
    creative_process: req.body.creative_process,
    ia_tools: req.body.ia_tools,
    has_subs: req.body.hasSubs === "true" || req.body.hasSubs === true,
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

const getAllMovies = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = (page - 1) * limit;

  movieModel.getAllMovies(limit, offset, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(results);
  });
};

const getBestMovies = (req: Request, res: Response) => {
  movieModel.getBestMovies((err: any, results: any) => {
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

export default {
  addMovie,
  getAllMovies,
  getBestMovies,
  getMoviesSum,
};
