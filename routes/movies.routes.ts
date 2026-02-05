import { Router } from "express";
import movieController from "../controllers/movies.controller";
import upload from "../config/multer";
const router = Router();

router.get("/", movieController.getAllMovies);
router.get("/count", movieController.getMoviesSum);
router.get("/best", movieController.getBestMovies);

router.post("/", upload.single("file"), movieController.addMovie);

export default router;
