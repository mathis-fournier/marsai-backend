import { Router } from "express";
import usersController from "../controllers/users.controller";

const router = Router();

router.post('/', usersController.addUser);

export default router;