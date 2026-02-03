const db = require("../config/database");

const deleteEvent = (data: any, callback: (err: any, results: any) => void) => {
  const query = "DELETE FROM event WHERE id = ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

const deleteUser = (userId: string | string[] | undefined, callback: (err: any, results: any) => void) => {
  const query = "DELETE FROM user WHERE id = ?";
  db.query(query, userId, (err: any, results: any) => {
    callback(err, results);
  });
};

const promoteToAdmin = (userId: string | string[]| undefined, callback: (err: any, results: any) => void) => {
  const query = "INSERT INTO role_user (user_id, role_id) VALUES (?, (SELECT id FROM role WHERE name = 'ADMIN'))";
  db.query(query, userId, (err: any, results: any) => {
    callback(err, results);
  });
};

const promoteToJury = (userId: string | string[] | undefined, callback: (err: any, results: any) => void) => {
  const query = "INSERT INTO role_user (user_id, role_id) VALUES (?, (SELECT id FROM role WHERE name = 'JURY'))";
  db.query(query, userId, (err: any, results: any) => {
    callback(err, results);
  });
};

const updateToAdmin = (userId: string | string[] | undefined, callback: (err: any, results: any) => void) => {
  const query = `
    UPDATE role_user
    SET role_id = (SELECT id FROM role WHERE name = 'ADMIN')
    WHERE user_id = ?
  `;
  db.query(query, userId, (err: any, results: any) => {
    callback(err, results);
  });
};

 const updateToJury = (userId: string | string[] | undefined, callback: (err: any, results: any) => void) => {
  const query = `
    UPDATE role_user
    SET role_id = (SELECT id FROM role WHERE name = 'JURY')
    WHERE user_id = ?
  `;
  db.query(query, userId, (err: any, results: any) => {
    callback(err, results);
  }); 
}

 const getAllUsers = (callback: (err: any, results: any) => void) => {
  const query = `
    SELECT u.id, u.firstname, u.lastname, u.email, GROUP_CONCAT(r.name) AS role
    FROM user u
    LEFT JOIN role_user ru ON u.id = ru.user_id
    LEFT JOIN role r ON ru.role_id = r.id
    GROUP BY u.id
  `;
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

export default { deleteEvent, promoteToAdmin, promoteToJury, getAllUsers, deleteUser, updateToAdmin, updateToJury };