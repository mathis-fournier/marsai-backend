import express, { Request, Response } from "express";
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.delete("/event", adminController.deleteEvent);

module.exports = router;
