import Users from "../models/auth.model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as z from "zod";

const UserRegister = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  firstname: z.string().min(1, "Firstname obligatoire"),
  lastname: z.string().min(1, "Lastname obligatoire"),
});

const UserLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable.");
  process.exit(1);
}

const addUser = (req: any, res: any) => {
  const validation = UserRegister.safeParse(req.body);
  if (!validation.success) {
    console.error(validation.error.issues);
    return res.status(400).json({ errors: validation.error.issues });
  }

  const { email, password, firstname, lastname } = validation.data;

  // Hasher le mot de passe
  const hashedPassword: string = bcrypt.hashSync(password, 10);

  // Enregistrer l'utilisateur dans la base de données
  Users.addUser(
    email,
    hashedPassword,
    firstname,
    lastname,
    (error: Error, results: any) => {
      if (error) {
        console.error(
          "Erreur lors de la création de l'utilisateur :",
          error.message,
        );
        return res.status(500).send("Erreur serveur");
      }
      res.status(201).json({ id: results.insertId, email });
    },
  );
};

const loginUser = (req: any, res: any) => {
  const validation = UserLogin.safeParse(req.body);
  if (!validation.success) {
    console.error(validation.error.issues);
    return res.status(400).json({ errors: validation.error.issues });
  }
  const { email, password } = validation.data;

  Users.getUserByEmail(email, (error: Error, user: any) => {
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).send("Email ou mot de passe incorrect");
    }
    // Gérer les erreurs SQL
    if (error) {
      console.error("Erreur SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }
    // Comparer les mots de passe
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Email ou mot de passe incorrect");
    }

    // Token JWT génération
    const token = jsonwebtoken.sign(
      { userId: user.id, role: user.role },
      (process.env.JWT_SECRET as string).trim(),
      { expiresIn: "1h" },
    );

    // Login réussi
    res.status(200).json({ token, user });
  });
};

const getMe = (req: any, res: any) => {
  Users.getUserById(req.user.userId, (error: Error, results: any) => {
    if (error) {
      return res.status(500).send("Erreur serveur");
    }
    res.json(results);
  });
};

export default { addUser, loginUser, getMe };
