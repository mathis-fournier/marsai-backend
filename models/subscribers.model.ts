const db = require("../config/database");

function getSubscribersByEmail(
  email: string,
  callback: (err: any, results?: any) => void,
): void {
  const query = "SELECT * FROM subscriber WHERE email = ?";
  db.query(query, [email], (err: any, results: any) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}

function addSubscriber(
  email: string,
  callback: (err: any, results?: any) => void,
): void {
  const query = "INSERT INTO subscriber (email) VALUES (?)";
  db.query(query, [email], (err: any, results: any) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}

function removeSubscriber(
  email: string,
  callback: (err: any, results?: any) => void,
): void {
  const query = "DELETE FROM subscriber WHERE email = ?";
  db.query(query, [email], (err: any, results: any) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}

export default { addSubscriber, removeSubscriber, getSubscribersByEmail };
