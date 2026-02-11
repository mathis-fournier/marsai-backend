import { Router } from "express";
import movieController from "../controllers/movies.controller";
import upload from "../config/multer";
const router = Router();

router.get("/", movieController.getAllMovies);
router.get("/count", movieController.getMoviesSum);
router.get("/directors/count", movieController.getDirectorsSum);
router.get("/best", movieController.getBestMovies);
router.get("/:id", movieController.getMovieDetails);
router.get("/:id/ratings", movieController.getMovieRatings);
router.get("/:id/tags", movieController.getMovieTags);
router.get("/:id/collaborators", movieController.getMovieCollaborators);
router.post("/:id/rating", movieController.postMovieRating);
router.put("/:id", movieController.changeMovieStatus);

router.post("/", upload.single("file"), movieController.addMovie);

export default router;
