import Users from "../models/auth.model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as z from "zod";

const UserRegister = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caracteres minimum"),
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
    return res.status(400).json({ errors: validation.error.issues });
  }

  const { email, password, firstname, lastname } = validation.data;

  // HASH PASSWORD
  const hashedPassword: string = bcrypt.hashSync(password, 10);

  // SAVE USER TO DB
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
    return res.status(400).json({ errors: validation.error.issues });
  }
  const { email, password } = validation.data;

  Users.getUserByEmail(email, (error: Error, user: any) => {
    // CHECK IF USER EXISTS
    if (!user) {
      return res.status(404).send("Email ou mot de passe incorrect");
    }
    // HANDLE SQL ERROR
    if (error) {
      console.error("Erreur SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }
    // COMPARE PASSWORDS
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Email ou mot de passe incorrect");
    }

    // JWT TOKEN GENERATION
    const token = jsonwebtoken.sign(
      { userId: user.id, role: user.role },
      (process.env.JWT_SECRET as string).trim(),
      { expiresIn: "1h" },
    );

    // SUCCESSFUL LOGIN
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
