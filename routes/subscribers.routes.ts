import { Router } from "express";
import subscribersController from "../controllers/subscribers.controller";

const router = Router();


router.get("/", subscribersController.getAllSubscribers);
router.post("/subscribe", subscribersController.subscribeNewsletter);
router.delete("/unsubscribe", subscribersController.unsubscribeNewsletter);

export default router;