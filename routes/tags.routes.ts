import { Router } from "express";
import tagsController from "../controllers/tags.controller";

const router = Router();

router.get("/", tagsController.getAllTags);
router.post("/", tagsController.addTag);

export default router;
