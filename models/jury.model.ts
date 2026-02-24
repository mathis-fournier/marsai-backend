const db = require("../config/database");

const getRatingCount = (callback: (err: any, results: any) => void) => {
  const query = "SELECT COUNT(*) as total FROM rating";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    const total = results[0].total;
    callback(null, total);
  });
};

export default { getRatingCount };
