import { Router } from "express";
import usersController from "../controllers/auth.controller";
import authenticateToken from "../middlewares/authenticateToken";
import authorizedRoles from "../middlewares/authorizedRoles";

const router = Router();

router.post('/register', usersController.addUser);
router.post('/login', usersController.loginUser);
router.get('/me', authenticateToken, authorizedRoles(['ADMIN', 'JURY']), usersController.getMe);

export default router;