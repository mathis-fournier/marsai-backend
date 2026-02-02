const db = require('../config/database');

const addUser = (email: string, password: string, firstname: string, lastname: string, callback: Function) => {
    const query = 'INSERT INTO user (email, password, firstname, lastname) VALUES (?,?,?,?)';
    db.query(query, [email, password, firstname, lastname], (error: Error, results: any) => {
        callback(error, results);
    });
};

export default { addUser };
