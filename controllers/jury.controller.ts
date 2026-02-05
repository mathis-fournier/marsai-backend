const db = require("../config/database");
import { Request, Response } from "express";
import juryModel from "../models/jury.model";

const getRatingCount = (req: Request, res: Response) => {
  juryModel.getRatingCount((err: any, total: any) => {
    if (err) {
      return res.status(500).json({
        error: "Erreur de base de données lors de la récupération du total.",
      });
    }
    res.json({ total });
  });
};

export default {
  getRatingCount,
};
