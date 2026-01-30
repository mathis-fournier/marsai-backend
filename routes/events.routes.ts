import { Router } from "express";
import eventsController from "../controllers/events.controller";

const router = Router();

router.get("/all", eventsController.getAll);

export default router;
