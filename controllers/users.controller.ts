import Users from '../models/users.model';
import bcrypr from 'bcrypt';

const addUser = (req: any, res: any) => {
    const { email, password, firstname, lastname } = req.body;


    // HASH PASSWORD
    const hashedPassword: string = bcrypr.hashSync(password, 10);

    // SAVE USER TO DB
    Users.addUser(email, hashedPassword, firstname, lastname, (error: Error, results: any) => {
        if (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error.message);
            return res.status(500).send('Erreur serveur');
        }
        res.status(201).json({ id: results.insertId, email });
    });
}

export default { addUser };

