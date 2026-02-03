const db = require("../config/database");
import { Request, Response } from "express";
import eventsModel from "../models/events.model";

const getAll = (req: Request, res: Response) => {
  eventsModel.getAll((err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getOne = (req: Request, res: Response) => {
  const id = req.params.id;
  eventsModel.getOne(id, (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

export default {
  getAll,
  getOne,
};
