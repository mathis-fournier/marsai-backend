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

const CreateReservation = z.object({
  firstname: z.string().min(2, "Prénom trop court"),
  lastname: z.string().min(2, "Nom trop court"),
  email: z.email("Email invalide"),
  event_id: z.number().int(),
});
const addEvent = async (req: Request, res: Response) => {
  try {
    const validation = CreateEvent.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const event = validation.data;
    const result = await eventsModel.addEvent(event);

    return res.status(201).json({ message: "Event ajouté avec succès" });
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Database error" });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const results = await eventsModel.getAll();
    res.json(results);
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Database error" });
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await eventsModel.getOne(id);
    res.json(results);
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Database error" });
  }
};

const getParticipantSum = async (req: Request, res: Response) => {
  try {
    const total = await eventsModel.getParticipantSum();
    res.json({ total });
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({
      error: "Erreur de base de données lors de la récupération du total.",
    });
  }
};

const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await eventsModel.deleteOne(id);
    res.json(results);
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Database error" });
  }
};

const getReservations = async (req: Request, res: Response) => {
  try {
    const results = await eventsModel.getReservations();
    res.json(results);
  } catch (error: any) {
    console.error("Database error:", error.message);
    return res.status(500).json({ error: "Database error" });
  }
};

const addReservation = async (req: Request, res: Response) => {
  try {
    const validation = CreateReservation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { firstname, lastname, email, event_id } = validation.data;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        error: "Les champs firstname, lastname et email sont requis.",
      });
    }
    // Vérification de l'unicité de l'email pour l'événement
    const existingBooking = await eventsModel.findParticipantByEmail(email);
    if (existingBooking !== null) {
      return res.status(400).json({
        error: "Cet email est déjà inscrit pour cet événement.",
      });
    }
    const result = await eventsModel.addBooking({
      participant: { firstname, lastname, email },
      event_id,
    });
    return res.status(201).json({
      message: "Réservation réussie",
      participantId: result.participantId,
      bookingId: result.bookingId,
    });
  } catch (error: any) {
    console.error("Erreur de réservation :", error.message);
    return res.status(500).json({
      error: "Erreur lors de la réservation : " + error.message,
    });
  }
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
