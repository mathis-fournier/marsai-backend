import { Router } from "express";
import MovieController from "../controllers/movies.controller";

const router = Router();

router.post("/", MovieController.addMovie);
router.get("/all", MovieController.getAllMovies);
router.get("/best", MovieController.getBestMovies);

export default router;
