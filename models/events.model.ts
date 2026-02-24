import { Event } from "../interfaces/event.interfaces";

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

const getParticipantSum = (callback: (err: any, results: any) => void) => {
  const query = "SELECT COUNT(*) as total FROM participant";
  db.query(query, (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    const total = results[0].total;
    callback(null, total);
  });
};

const addEvent = (data: Event, callback: (err: any, results: any) => void) => {
  const query =
    "INSERT INTO event (title, description, status, start_at, duration, location, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    data.title,
    data.description,
    data.status || "Scheduled",
    data.start_at,
    data.duration,
    data.location,
    data.created_at || new Date(),
    data.updated_at || new Date(),
    data.published_at,
  ];

  db.query(query, values, (err: any, results: any) => {
    if (err) {
      return callback(err, null);
    }
    callback(err, results);
  });
};

const deleteOne = (data: any, callback: (err: any, results: any) => void) => {
  const query = "DELETE * FROM event WHERE id = ?";
  db.query(query, data, (err: any, results: any) => {
    callback(err, results);
  });
};

export default { getAll, getOne, deleteOne, addEvent, getParticipantSum };
