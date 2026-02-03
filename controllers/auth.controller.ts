import Users from '../models/auth.model';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    console.error("Missing JWT_SECRET environment variable.");
    process.exit(1);
}

const addUser = (req: any, res: any) => {

    const { email, password, firstname, lastname } = req.body;

    // HASH PASSWORD
    const hashedPassword: string = bcrypt.hashSync(password, 10);

    // SAVE USER TO DB
    Users.addUser(email, hashedPassword, firstname, lastname, (error: Error, results: any) => {
        if (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error.message);
            return res.status(500).send('Erreur serveur');
        }
        res.status(201).json({ id: results.insertId, email });
    });
};

const loginUser = (req: any, res: any) => {
    const { email, password } = req.body;

    Users.getUserByEmail(email, (error: Error, user: any) => {
        // CHECK IF USER EXISTS
        if (!user) {
            return res.status(404).send('Email ou mot de passe incorrect');
        }
        // HANDLE SQL ERROR
        if (error) {
            console.error("Erreur SQL:", error.message);
            return res.status(500).send("Erreur serveur");
        }
        // COMPARE PASSWORDS
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Email ou mot de passe incorrect');
        }

        // JWT TOKEN GENERATION
        const token = jsonwebtoken.sign( { userId: user.id, role: user.role }, (process.env.JWT_SECRET as string).trim(), { expiresIn: "1h" });

        // SUCCESSFUL LOGIN
        res.status(200).json({ token, user });
    });
}

const getMe = (req: any, res: any) => {
    Users.getUserById (req.user.userId, (error: Error, results: any) => {
        if (error) {
            return res.status(500).send("Erreur serveur");
        }
        res.json(results);
    });
};

export default { addUser, loginUser, getMe };
