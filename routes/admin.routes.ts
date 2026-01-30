import { Router } from "express";
import adminController from "../controllers/admin.controller";

const router = Router();

router.delete("/event", adminController.deleteEvent);

export default router;
