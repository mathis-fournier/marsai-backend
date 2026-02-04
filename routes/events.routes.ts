import { Router } from "express";
import eventsController from "../controllers/events.controller";

const router = Router();

router.get("/all", eventsController.getAll);
router.get("/:id", eventsController.getOne);
router.get("/stats/count", eventsController.getParticipantSum);

export default router;
