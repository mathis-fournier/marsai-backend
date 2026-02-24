const db = require("../config/database");
import { Request, Response } from "express";
import eventsModel from "../models/events.model";
import * as z from "zod";

const CreateEvent = z.object({
  title: z.string().max(50, "Titre trop long"),
  description: z.string().min(10, "10 caracteres minimum"),
  status: z.enum(["Scheduled", "Cancelled", "Completed"]),
  start_at: z.coerce.date(),
  duration: z.number(),
  location: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  published_at: z.coerce.date(),
});

const addEvent = (req: Request, res: Response) => {
  const validation = CreateEvent.safeParse(req.body);
  if (!validation.success) {
    console.error(validation.error.issues);
    return res.status(400).json({ errors: validation.error.issues });
  }
  const event = validation.data;
  eventsModel.addEvent(event, (err: any, total: any) => {
    if (err) {
      console.error("ERREUR SQL DÉTAILLÉE :", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(201).json({ message: "Event ajouté avec succès" });
  });
};

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
    res.json({ total });
  });
};

const deleteOne = (req: Request, res: Response) => {
  const id = req.params.id;
  eventsModel.deleteOne(id, (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getReservations = (req: Request, res: Response) => {
  eventsModel.getReservations((err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const addReservation = async (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  eventsModel.addParticipant(
    { firstname, lastname, email },
    (err: any, results: any) => {
      if (err) {
        return res.status(500).json({ error: "Database error" + err });
      }
      res.json(results);
    },
  );

  const { participant_id, event_id } = req.body;
  const booked_at = Date.now();
  eventsModel.addBooking(
    { participant_id, event_id, booked_at },
    (err: any, results: any) => {
      if (err) {
        return res.status(500).json({ error: "Database error" + err });
      }
      res.json(results);
    },
  );
};

export default {
  getAll,
  getOne,
  deleteOne,
  addEvent,
  getParticipantSum,
  getReservations,
  addReservation,
};
