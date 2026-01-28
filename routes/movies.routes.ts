import express, { Request, Response } from "express";
const router = express.Router();

const MovieController = require("../controllers/movies.controller");

router.post("/", MovieController.addMovie);
router.get("/all", MovieController.getAllMovies);
router.get("/best", MovieController.getBestMovies);

module.exports = router;
