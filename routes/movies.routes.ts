import { Router, Request, Response, NextFunction } from "express";
import movieController from "../controllers/movies.controller";
import upload from "../config/multer";

const router = Router();

// --- Validation des paramètres ---
// Utilisez router.param() pour valider 'id' comme numérique. C'est une façon propre de gérer
// les contraintes de paramètre. Si l'ID n'est pas numérique, Express passera à la route suivante,
// permettant aux chemins comme '/hybrid' d'être gérés par '/:category'.
router.param(
  "id",
  (req: Request, res: Response, next: NextFunction, id: any) => {
    if (/^\d+$/.test(id)) {
      next(); // L'ID est numérique, continuez au gestionnaire de route.
    } else {
      next("route"); // L'ID n'est pas numérique, ignorez les routes '/:id' de ce routeur.
    }
  },
);

// --- Routes spécifiques et non paramétrées en premier ---
router.get("/count", movieController.getMoviesSum);
router.get("/directors/count", movieController.getDirectorsSum);

// --- Routes spécifiques aux films (par ID) ---
// Avec router.param(), nous utilisons simplement /:id. La validation est gérée ci-dessus.
// Ces routes sont placées avant /:category pour être matchées en premier pour les IDs numériques.
router.get("/:id", movieController.getMovieDetails);
router.get("/:id/ratings", movieController.getMovieRatings);
router.get("/:id/tags", movieController.getMovieTags);
router.get("/:id/collaborators", movieController.getMovieCollaborators);
router.post("/:id/ratings", movieController.postMovieRating);

// --- Routes de liste de films ---
// Nous définissons un seul gestionnaire pour toutes les requêtes de type liste.
const listMoviesHandler = (req: Request, res: Response) => {
  const { category, tag } = req.params;

  if (category === "pending") {
    if (tag) {
      movieController.getSelectedMoviesByTag(req, res);
    } else {
      movieController.getSelectedMovies(req, res);
    }
  } else if (category === "selection") {
    if (tag) {
      movieController.getSelectedMoviesByTag(req, res);
    } else {
      movieController.getSelectedMovies(req, res);
    }
  } else if (category === "hybrid") {
    movieController.getHybridMovies(req, res);
  } else if (category === "fullAI") {
    movieController.getFullAIMovies(req, res);
  } else {
    // Gère GET / et GET /:category (pour les catégories non spéciales)
    movieController.getAllMovies(req, res);
  }
};

// Enregistrez le gestionnaire pour les différentes routes de liste.
// Ces routes seront essayées si les routes ci-dessus (par exemple, /:id) sont ignorées.
router.get("/:category/:tag", listMoviesHandler);
router.get("/:category", listMoviesHandler);
router.get("/", listMoviesHandler);

// --- Création de film ---
router.post("/", upload.single("file"), movieController.addMovie);

export default router;
