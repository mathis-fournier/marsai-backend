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

function addTag(req: Request, res: Response) {
  if (!req.body.data.name || !req.body.data.movie_id) {
    return res.status(400).send();
  } else
    try {
      tagsModel.insertTag(
        req.body.data.name,
        req.body.data.movie_id,
        (err: Error | null, results: any) => {
          if (err) {
            console.error("Error while inserting tag");
            return res.status(500).send("Erreur SQL : " + err.message);
          }
          return res.status(200).json(results);
        },
      );
    } catch (error: any) {
      console.error("Unexpected error : " + error.message);
    }
}

export default { getAllTags, addTag };
