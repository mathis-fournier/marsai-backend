import { Router } from "express";
import adminController from "../controllers/admin.controller";

const router = Router();

router.delete("/event/:id", adminController.deleteEvent);

export default router;
