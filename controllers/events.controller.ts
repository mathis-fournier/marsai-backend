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

const getParticipantSum = (req: Request, res: Response) => {
  eventsModel.getParticipantSum((err: any, total: any) => {
    if (err) {
      return res.status(500).json({
        error: "Erreur de base de données lors de la récupération du total.",
      });
    }
    console.log("controller end");
    res.json({ total });
  });
};

export default {
  getAll,
  getOne,
  getParticipantSum,
};
