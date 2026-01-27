const db = require("../config/database");

const getAll = (callback: (err: any, results: any) => void) => {
  const query = "SELECT * FROM event";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

module.exports = { getAll };
