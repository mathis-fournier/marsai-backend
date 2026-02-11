import { Router } from "express";
import adminController from "../controllers/admin.controller";
import authorizedRoles from "../middlewares/authorizedRoles";
import authenticateToken from "../middlewares/authenticateToken";
import moviesController from "../controllers/movies.controller";

const router = Router();

router.delete(
  "/event/:id",
  authenticateToken,
  authorizedRoles(["ADMIN"]),
  adminController.deleteEvent,
);
router.post(
  "/promote/jury/:userId",
  authenticateToken,
  authorizedRoles(["ADMIN"]),
  adminController.promoteToJury,
);
router.post(
  "/promote/admin/:userId",
  authenticateToken,
  authorizedRoles(["ADMIN"]),
  adminController.promoteToAdmin,
);
router.get(
  "/users",
  authenticateToken,
  authorizedRoles(["ADMIN"]),
  adminController.getAllUsers,
);
router.delete(
  "/users/:id",
  authenticateToken,
  authorizedRoles(["ADMIN"]),
  adminController.deleteUser,
);
router.put(
  "/:id",
  authenticateToken,
  authorizedRoles(["ADMIN", "JURY"]),
  moviesController.changeMovieStatus,
);

export default router;
