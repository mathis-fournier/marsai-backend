import express, { Request, Response } from "express";
const router = express.Router();

const MovieController = require("../controllers/movies.controller");

router.get("/addMovie", MovieController.addMovie);
router.get("/getMovies", MovieController.getMovies);

module.exports = router;
