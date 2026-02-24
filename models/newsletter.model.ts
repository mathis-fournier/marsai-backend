const db = require("../config/database");

function addNewsletter(
  { object, content }: { object: string; content: string },
  callback: (err: any, results: any) => void,
) {
  const query = "INSERT INTO newsletter (object, content) VALUES(?, ?)";
  db.query(query, [object, content], (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    callback(err, results);
  });
}

function getAllNewsletters(callback: (err: Error, results: any) => void) {
  const query = "SELECT * FROM newsletter";
  db.query(query, [], (err: Error, results: any) => {
    if (err) return callback(err, null);
    callback(err, results);
  });
}

function getNewsletterById(
  newsletterId: string,
  callback: (error: Error, results: any) => void,
) {
  const query = "SELECT * FROM newsletter WHERE id = ?";
  db.query(query, [newsletterId], (error: Error, results: any) => {
    if (error) return callback(error, null);
    callback(error, results);
  });
}

export default { addNewsletter, getAllNewsletters, getNewsletterById };
