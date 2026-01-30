const db = require("../config/database");
import { Request, Response } from "express";

const testModel = require("../models/test.model");

const test = (req: Request, res: Response) => {
  testModel.test((err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

export default {
  test,
};
