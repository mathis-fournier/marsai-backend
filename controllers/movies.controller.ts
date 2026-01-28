const db = require("../config/database");
import { Request, Response } from "express";
import { Movie } from "../interfaces/movies.interfaces";

const movieModel = require("../models/movies.model");

const addMovie = (req: Request, res: Response) => {
  const file = (req as any).file;
  const newMovie: Movie = {
    original_title: req.body.original_title,
    english_title: req.body.english_title,
    youtube_url: req.body.youtube_url,
    cover_image:
      file ??
      "https://media.newyorker.com/photos/68c1f35c33ed00be6a5dd57f/4:3/w_2276,h_1707,c_limit/NL-CHARLIE_KIRK-AP25253709556517.jpg",
    duration: parseInt(req.body.duration),
    isHybrid: req.body.isHybrid === "true" || req.body.isHybrid === true,
    original_language: req.body.original_language,
    original_synopsis: req.body.original_synopsis,
    english_synopsis: req.body.english_synopsis,
    creative_process: req.body.creative_process,
    ia_tools: req.body.ia_tools,
    hasSubs: req.body.hasSubs === "true" || req.body.hasSubs === true,
  };
  movieModel.postMovie(newMovie, (err: any, results: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res
      .status(201)
      .json({ message: "Film ajouter avec succès", id: results.insertId });
  });
};

module.exports = {
  addMovie,
};
