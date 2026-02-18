import { Request, Response } from "express";
import tagsModel from "../models/tags.model";

function getAllTags(req: Request, res: Response) {
  try {
    tagsModel.getAllTagsAvailable((err: Error | null, results: any) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des tags: " + err.message,
        );
        return res.status(500).send("Erreur: " + err.message);
      }
      res.status(200).json(results);
    });
  } catch (error: any) {
    console.error("Erreur inattendue: " + error.message);
    res.status(500).send("Erreur inattendue: " + error.message);
  }
}

export default { getAllTags };
