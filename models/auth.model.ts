const db = require('../config/database');

const addUser = (email: string, password: string, firstname: string, lastname: string, callback: Function) => {
    const query = 'INSERT INTO user (email, password, firstname, lastname) VALUES (?,?,?,?)';
    db.query(query, [email, password, firstname, lastname], (error: Error, results: any) => {
        callback(error, results);
    });
};

const getUserByEmail = (email: string, callback: Function) => {
    const query = `
        SELECT u.*, r.name as role
        FROM user u
        LEFT JOIN role_user ru ON u.id = ru.user_id
        LEFT JOIN role r ON ru.role_id = r.id
        WHERE u.email = ?
    `;
    db.query(query, [email], (error: Error, results: any) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results[0]);
    });
};

const getUserById = (id: number, callback: Function) => {
    const query = `
        SELECT u.firstname, u.lastname, u.email, r.name as role
        FROM user u
        LEFT JOIN role_user ru ON u.id = ru.user_id
        LEFT JOIN role r ON ru.role_id = r.id
        WHERE u.id = ?
    `;
    db.query(query, [id], (error: Error, results: any) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results[0]);
    });
};

export default { addUser, getUserByEmail, getUserById };