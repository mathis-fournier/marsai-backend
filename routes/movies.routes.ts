import { Router } from "express";
import movieController from "../controllers/movies.controller";

const router = Router();

router.get("/", movieController.getAllMovies);
router.get("/count", movieController.getMoviesSum);
router.get("/best", movieController.getBestMovies);
router.get("/:id", movieController.getMovieDetails);
router.get("/:id/ratings", movieController.getMovieRatings);
router.get("/:id/tags", movieController.getMovieTags);
router.get("/:id/collaborators", movieController.getMovieCollaborators);

router.post("/", movieController.addMovie);

export default router;
