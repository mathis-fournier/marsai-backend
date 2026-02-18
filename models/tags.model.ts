const db = require("../config/database");

const getAllTagsAvailable = (callback: (err: any, results: any) => void) => {
  const query = `SELECT * FROM tag`;
  db.query(query, (err: Error, results: any) => {
    if (err) callback(err, null);
    else callback(err, results);
  });
};

export default { getAllTagsAvailable };
