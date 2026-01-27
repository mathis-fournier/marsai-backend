import express, { Request, Response } from "express";
const router = express.Router();

const eventsController = require("../controllers/events.controller");

router.get("/all", eventsController.getAll);

module.exports = router;
