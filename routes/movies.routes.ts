import express, { Request, Response } from "express";
const router = express.Router();

const MovieController = require("../controllers/movies.controller");

router.post("/", MovieController.addMovie);
// router.get("/getMovies", MovieController.getMovies);

module.exports = router;
