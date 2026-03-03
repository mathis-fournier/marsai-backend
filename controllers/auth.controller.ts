import Users from "../models/auth.model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as z from "zod";
import { Request, Response } from "express";

const UserLogin = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

const UserRegisterSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
  firstname: z.string().min(2, "Prénom requis"),
  lastname: z.string().min(2, "Nom requis"),
});

const addUser = async (req: Request, res: Response) => {
  const validation = UserRegisterSchema.safeParse(req.body);

  if (!validation.success) {
    console.error(validation.error.issues);
    return res.status(400).json({ errors: validation.error.issues });
  }

  const { email, password, firstname, lastname } = validation.data;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Users.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Appeler la méthode du modèle
    const user = await Users.addUser(
      email,
      hashedPassword,
      firstname,
      lastname,
    );

    res.status(201).json(user);
  } catch (error: any) {
    console.error(
      "Erreur lors de la création de l'utilisateur :",
      error.message,
    );
    return res.status(500).send("Erreur serveur");
  }
};

const loginUser = async (req: Request, res: Response) => {
  const validation = UserLogin.safeParse(req.body);
  if (!validation.success) {
    console.error(validation.error.issues);
    return res.status(400).json({ errors: validation.error.issues });
  }
  const { email, password } = validation.data;

  try {
    const user = await Users.getUserByEmail(email);
    if (!user) {
      return res.status(401).send("Email ou mot de passe incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Email ou mot de passe incorrect");
    }

    const jwtSecret = (process.env.JWT_SECRET || "").trim();
    if (!jwtSecret) {
      console.error("JWT_SECRET is missing");
      return res.status(500).send("Erreur de configuration serveur");
    }

    // Token JWT génération
    const token = jsonwebtoken.sign(
      { userId: user.id, role: user.role },
      jwtSecret,
      { expiresIn: "1h" },
    );

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error: any) {
    console.error("Erreur login:", error.message);
    return res.status(500).send("Erreur serveur");
  }
};

const getMe = async (req: any, res: Response) => {
  try {
    const user = await Users.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error: any) {
    console.error("Erreur getMe:", error.message);
    return res.status(500).send("Erreur serveur");
  }
};

export default { addUser, loginUser, getMe };
