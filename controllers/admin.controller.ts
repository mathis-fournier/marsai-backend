const db = require("../config/database");
import { Request, Response } from "express";
import adminModel from "../models/admin.model";
import authModel from "../models/auth.model";

const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  adminModel.deleteEvent(id, (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getAllUsers = (req: Request, res: Response) => {
    adminModel.getAllUsers((error: Error, results: any) => {
        if (error) {
            return res.status(500).send("Erreur serveur");
        }
        res.json(results);
    });
};

const promoteToAdmin = (req: Request, res: Response) => {
    const { userId } = req.params;
    authModel.getUserById(userId, (error: Error, user: any) => {
        if (error) {
            return res.status(500).send("Erreur serveur");
        }
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (user.role === 'ADMIN') {
            return res.status(400).send("L'utilisateur est déjà un administrateur");
        }
        else if (user.role === 'JURY') {
          adminModel.updateToAdmin(userId, (error: Error, results: any) => {
            if (error) {
              return res.status(500).send("Erreur serveur");
            }
            res.json(results);
          });
        } else {
          adminModel.promoteToAdmin(userId, (error: Error, results: any) => {
            if (error) {
              return res.status(500).send("Erreur serveur");
            }
            res.json(results);
          });
        }}
      );
};

const promoteToJury = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).send("ID utilisateur manquant");
    }

     authModel.getUserById(userId, (error: Error, user: any) => {
        if (error) {
            return res.status(500).send("Erreur serveur");
        }
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (user.role === 'JURY') {
            return res.status(400).send("L'utilisateur est déjà un jury");
        }
        else if (user.role === 'ADMIN') {
          adminModel.updateToJury(userId, (error: Error, results: any) => {
            if (error) {
              return res.status(500).send("Erreur serveur");
            }
            res.json(results);
          });
        } else {
          adminModel.promoteToJury(userId, (error: Error, results: any) => {
            if (error) {
              return res.status(500).send("Erreur serveur");
            }
            res.json(results);
          });
        }}
      );  
};

const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    adminModel.deleteUser(id, (error: Error, results: any) => {
        if (error) {
            return res.status(500).send("Erreur serveur");
        }
        res.json(results);
    });
};





export default {
  deleteEvent,
  promoteToAdmin,
  promoteToJury,
  getAllUsers,
  deleteUser
};
