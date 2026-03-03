import { db } from "../config/database";
import { Event } from "../interfaces/event.interfaces";

const getAll = async (): Promise<any> => {
  const query = "SELECT * FROM event";
  const [rows] = await db.query(query);
  return rows;
};

const getOne = async (data: any): Promise<any> => {
  const query = "SELECT * FROM event WHERE id = ?";
  const [rows]: any = await db.query(query, data);
  return rows[0];
};

const getParticipantSum = async (): Promise<number> => {
  const query = "SELECT COUNT(*) as total FROM participant";
  const [rows]: any = await db.query(query);
  return rows[0].total;
};

const addEvent = async (data: Event): Promise<any> => {
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

  const [result] = await db.query(query, values);
  return result;
};

const deleteOne = async (data: any): Promise<any> => {
  const query = "DELETE FROM event WHERE id = ?";
  const [result] = await db.query(query, data);
  return result;
};

const getReservations = async (): Promise<any> => {
  const query =
    "SELECT e.id AS event_id, e.title, p.id AS participant_id, p.firstname, b.booked_at FROM booking b JOIN event e ON b.event_id = e.id JOIN participant p ON b.participant_id = p.id";
  const [rows] = await db.query(query);
  return rows;
};

const addParticipant = async (data: any): Promise<any> => {
  const query =
    "INSERT INTO participant (firstname, lastname, email) VALUES (?, ?, ?)";
  const values = [data.firstname, data.lastname, data.email];
  const [result] = await db.query(query, values);
  return result;
};

const findParticipantByEmail = async (
  email: string,
): Promise<number | null> => {
  const query = "SELECT id FROM participant WHERE email = ?";
  const [rows]: any = await db.query(query, [email]);

  if (rows.length > 0) {
    return rows[0].id;
  }

  return null;
};

const addBooking = async (data: any): Promise<any> => {
  const email = data.participant.email;
  const participantId = await findParticipantByEmail(email);

  if (!participantId) {
    // Insérer le participant si inexistant
    const participantQuery =
      "INSERT INTO participant (firstname, lastname, email) VALUES (?, ?, ?)";
    const participantValues = [
      data.participant.firstname,
      data.participant.lastname,
      data.participant.email,
    ];
    const [participantResult]: any = await db.query(
      participantQuery,
      participantValues,
    );
    const newParticipantId = participantResult.insertId;

    // Puis insérer la réservation
    const bookingQuery =
      "INSERT INTO booking (participant_id, event_id, booked_at) VALUES (?, ?, NOW())";
    const bookingValues = [newParticipantId, data.event_id];
    const [bookingResult]: any = await db.query(bookingQuery, bookingValues);

    return {
      participantId: newParticipantId,
      bookingId: bookingResult.insertId,
    };
  } else {
    // Utiliser l'ID existant
    const bookingQuery =
      "INSERT INTO booking (participant_id, event_id, booked_at) VALUES (?, ?, NOW())";
    const bookingValues = [participantId, data.event_id];
    const [bookingResult]: any = await db.query(bookingQuery, bookingValues);

    return {
      participantId,
      bookingId: bookingResult.insertId,
    };
  }
};

export default {
  getAll,
  getOne,
  deleteOne,
  addEvent,
  getParticipantSum,
  getReservations,
  addParticipant,
  addBooking,
  findParticipantByEmail,
};
