import { Router } from "express";
import juryController from "../controllers/jury.controller";

const router = Router();

router.get("/rating/count", juryController.getRatingCount);

export default router;
