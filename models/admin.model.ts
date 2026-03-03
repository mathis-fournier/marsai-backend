import { db } from "../config/database";

const deleteEvent = async (data: any) => {
  const query = "DELETE FROM event WHERE id = ?";
  const [results] = await db.query(query, data);
  return results;
};

const deleteUser = async (userId: string | string[] | undefined) => {
  const query = "DELETE FROM user WHERE id = ?";
  const [results] = await db.query(query, userId);
  return results;
};

const promoteToAdmin = async (userId: string | string[] | undefined) => {
  const query =
    "INSERT INTO role_user (user_id, role_id) VALUES (?, (SELECT id FROM role WHERE name = 'ADMIN'))";
  const [results] = await db.query(query, userId);
  return results;
};

const promoteToJury = async (userId: string | string[] | undefined) => {
  const query =
    "INSERT INTO role_user (user_id, role_id) VALUES (?, (SELECT id FROM role WHERE name = 'JURY'))";
  const [results] = await db.query(query, userId);
  return results;
};

const updateToAdmin = async (userId: string | string[] | undefined) => {
  const query = `
    UPDATE role_user
    SET role_id = (SELECT id FROM role WHERE name = 'ADMIN')
    WHERE user_id = ?
  `;
  const [results] = await db.query(query, userId);
  return results;
};

const updateToJury = async (userId: string | string[] | undefined) => {
  const query = `
    UPDATE role_user
    SET role_id = (SELECT id FROM role WHERE name = 'JURY')
    WHERE user_id = ?
  `;
  const [results] = await db.query(query, userId);
  return results;
};

const getAllUsers = async () => {
  const query = `
    SELECT u.id, u.firstname, u.lastname, u.email, GROUP_CONCAT(r.name) AS role
    FROM user u
    LEFT JOIN role_user ru ON u.id = ru.user_id
    LEFT JOIN role r ON ru.role_id = r.id
    GROUP BY u.id
  `;
  const [results] = await db.query(query);
  return results;
};

export default {
  deleteEvent,
  promoteToAdmin,
  promoteToJury,
  getAllUsers,
  deleteUser,
  updateToAdmin,
  updateToJury,
};
