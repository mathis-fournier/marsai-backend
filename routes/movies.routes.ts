import { Router, Request, Response, NextFunction } from "express";
import movieController from "../controllers/movies.controller";
import upload from "../config/multer";

const router = Router();

// --- Validation des paramètres ---
router.param(
  "id",
  (req: Request, res: Response, next: NextFunction, id: any) => {
    if (/^\d+$/.test(id)) {
      next(); // L'ID est numérique, continuez au gestionnaire de route.
    } else {
      next("route"); // L'ID n'est pas numérique, ignorez les routes '/:id' de ce routeur.
    }
  },
);

// --- Routes spécifiques et non paramétrées en premier ---
router.get("/count", movieController.getMoviesSum);
router.get("/accepted/count", movieController.getRejectedMoviesCount);
// --- Routes spécifiques aux films (par ID) ---
router.get("/:id", movieController.getMovieDetails);
router.get("/:id/ratings", movieController.getMovieRatings);
router.get("/:id/tags", movieController.getMovieTags);
router.get("/:id/collaborators", movieController.getMovieCollaborators);
router.post("/:id/ratings", movieController.postMovieRating);

// --- Routes de liste de films ---
const listMoviesHandler = (req: Request, res: Response) => {
  const { category, type, tag: tagQuery } = req.query;
  const tag = tagQuery ? parseInt(tagQuery as string) : null;
  const moviesPerPage = parseInt(req.query.limit as string) || 20;
  const currentPage = parseInt(req.query.page as string) || 1;

  if (category === "pending") {
    if (tag !== null) {
      if (type === "hybrid") {
        movieController.getPendingHybridMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      } else if (type === "fullAI") {
        movieController.getPendingFullAIMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      } else {
        movieController.getPendingMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      }
    } else {
      if (type === "hybrid") {
        movieController.getPendingHybridMovies(
          req,
          res,
          moviesPerPage,
          currentPage,
        );
      } else if (type === "fullAI") {
        movieController.getPendingFullAIMovies(
          req,
          res,
          moviesPerPage,
          currentPage,
        );
      } else {
        movieController.getPendingMovies(req, res, moviesPerPage, currentPage);
      }
    }
  } else if (category === "selection") {
    if (tag !== null) {
      if (type === "hybrid") {
        movieController.getSelectedHybridMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      } else if (type === "fullAI") {
        movieController.getSelectedFullAIMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      } else {
        movieController.getSelectedMoviesByTag(
          req,
          res,
          moviesPerPage,
          currentPage,
          tag,
        );
      }
    } else {
      if (type === "hybrid") {
        movieController.getSelectedHybridMovies(
          req,
          res,
          moviesPerPage,
          currentPage,
        );
      } else if (type === "fullAI") {
        movieController.getSelectedFullAIMovies(
          req,
          res,
          moviesPerPage,
          currentPage,
        );
      } else {
        movieController.getSelectedMovies(req, res, moviesPerPage, currentPage);
      }
    }
  } else if (category === "rejected") {
    movieController.getRejectedMovies(req, res, moviesPerPage, currentPage);
  } else if (category === "best") {
    movieController.getBestMovies(req, res, moviesPerPage, currentPage);
  } else {
    // Gère GET /movies
    if (tag !== null) {
      movieController.getAllMoviesByTag(
        req,
        res,
        moviesPerPage,
        currentPage,
        tag,
      );
    } else {
      movieController.getAllMovies(req, res, moviesPerPage, currentPage);
    }
  }
};
// Enregistrez le gestionnaire pour les différentes routes de liste.
router.get("/", listMoviesHandler);

// --- Création de film ---
router.post("/", upload.single("file"), movieController.addMovie);

export default router;
