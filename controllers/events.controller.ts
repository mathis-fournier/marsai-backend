const db = require("../config/database");
import { Request, Response } from "express";

const eventsModel = require("../models/events.model");

const getAll = (req: Request, res: Response) => {
  eventsModel.getAll((err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

module.exports = {
  getAll,
};
