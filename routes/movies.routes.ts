import { Router } from "express";
import movieController from "../controllers/movies.controller";

const router = Router();

router.get("/", movieController.getAllMovies);
router.get("/count", movieController.getMoviesSum);
router.get("/best", movieController.getBestMovies);

router.post("/", movieController.addMovie);

export default router;
