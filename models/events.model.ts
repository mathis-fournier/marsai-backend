const db = require("../config/database");

const getAll = (callback: (err: any, results: any) => void) => {
  const query = "SELECT * FROM event";
  db.query(query, (err: any, results: any) => {
    callback(err, results);
  });
};

const getOne = (data: any, callback: (err: any, results: any) => void) => {
  const query = "SELECT * FROM event WHERE id = ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

export default { getAll, getOne };
