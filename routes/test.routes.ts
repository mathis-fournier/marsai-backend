import express, { Request, Response } from "express";
const router = express.Router();

const testController = require("../controllers/test.controller");

router.get("/test", testController.test);

module.exports = router;
