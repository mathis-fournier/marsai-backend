const db = require("../config/database");

const test = (callback: (err: any, results: any) => void) => {
  const query = "SELECT * FROM event";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

module.exports = { test };
