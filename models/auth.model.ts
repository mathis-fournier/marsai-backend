import { db } from "../config/database";

const getUserByEmail = async (email: string) => {
  const query = `
    SELECT u.*, COALESCE(GROUP_CONCAT(r.name), '') AS role
    FROM user u
    LEFT JOIN role_user ru ON u.id = ru.user_id
    LEFT JOIN role r ON ru.role_id = r.id
    WHERE u.email = ?
    GROUP BY u.id
  `;
  const [rows]: any = await db.query(query, [email]);
  return rows[0];
};

const getUserById = async (id: number) => {
  const query = `
    SELECT u.*, COALESCE(GROUP_CONCAT(r.name), '') AS role
    FROM user u
    LEFT JOIN role_user ru ON u.id = ru.user_id
    LEFT JOIN role r ON ru.role_id = r.id
    WHERE u.id = ?
    GROUP BY u.id
  `;
  const [rows]: any = await db.query(query, [id]);
  return rows[0];
};

const addUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const query = "INSERT INTO user (email, password, firstname, lastname) VALUES (?, ?, ?, ?)";
    const [result]: any = await connection.query(query, [
      email,
      password,
      firstname,
      lastname,
    ]);
    
    const userId = result.insertId;

    // Optionnel : Ajouter un rôle par défaut si nécessaire ici
    // const [roleResult]: any = await connection.query("SELECT id FROM role WHERE name = 'USER'");
    // if (roleResult[0]) {
    //   await connection.query("INSERT INTO role_user (user_id, role_id) VALUES (?, ?)", [userId, roleResult[0].id]);
    // }

    await connection.commit();
    return { id: userId, email };
  } catch (error: any) {
    await connection.rollback();
    console.error("Erreur lors de la création de l'utilisateur :", error.message);
    throw new Error("Erreur serveur");
  } finally {
    connection.release();
  }
};

export default { addUser, getUserByEmail, getUserById };
