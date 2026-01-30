const db = require("../config/database");

const deleteEvent = (data: any, callback: (err: any, results: any) => void) => {
  const query = "DELETE FROM event WHERE id = ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

module.exports = { deleteEvent };
