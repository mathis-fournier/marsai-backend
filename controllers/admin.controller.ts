const db = require("../config/database");
import { Request, Response } from "express";

import adminModel from "../models/admin.model";

const deleteEvent = (req: Request, res: Response) => {
  const id = req.body.id;
  adminModel.deleteEvent(id, (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

export default {
  deleteEvent,
};
