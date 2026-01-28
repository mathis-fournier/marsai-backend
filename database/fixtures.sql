USE marsai_db;

-- Fixtures for User table
INSERT INTO User (id, email, password, firstname, lastname) VALUES
(1, 'john.doe@example.com', 'password123', 'John', 'Doe'),
(2, 'jane.smith@example.com', 'password456', 'Jane', 'Smith'),
(3, 'admin@marsai.com', 'adminpass', 'Admin', 'User'),
(4, 'peter.jones@example.com', 'securepass', 'Peter', 'Jones'),
(5, 'mary.williams@example.com', 'mysecret', 'Mary', 'Williams');

-- Fixtures for Role table
INSERT INTO Role (id, name) VALUES
(1, 'ADMIN'),
(2, 'JURY');

-- Fixtures for Role_User table
INSERT INTO Role_User (user_id, role_id) VALUES
(1, 2),
(2, 2),
(3, 1),
(4, 2),
(5, 2);

-- Fixtures for Newsletter table
INSERT INTO Newsletter (id, object, content, created_at, sent_at) VALUES
(1, 'Welcome to MarsAI!', 'This is the first newsletter.', NOW(), NOW()),
(2, 'Latest Movie Submissions', 'Check out the latest movies submitted to our platform.', NOW(), NULL),
(3, 'Upcoming Events', 'Don''t miss our next workshops and festivals!', NOW(), NOW());

-- Fixtures for Subscriber table
INSERT INTO Subscriber (id, email, created_at) VALUES
(1, 'subscriber1@example.com', NOW()),
(2, 'subscriber2@example.com', NOW()),
(3, 'subscriber3@example.com', NOW());

-- Fixtures for Movie table
INSERT INTO Movie (id, original_title, english_title, submitted_at, youtube_url, cover_image, duration, isHybrid, original_language, original_synopsis, english_synopsis, creative_process, ia_tools, hasSubs, srt, status) VALUES
(1, 'Le Voyage Imaginaire', 'The Imaginary Journey', NOW(), 'https://www.youtube.com/watch?v=video1', '/images/cover1.jpg', 120, 1, 'French', 'Un voyage incroyable...', 'An incredible journey...', 'Lots of AI tools were used.', 'Midjourney, RunwayML', 1, '/subs/sub1.srt', 'Accepted'),
(2, 'The Last Stand', 'The Last Stand', NOW(), 'https://www.youtube.com/watch?v=video2', '/images/cover2.jpg', 95, 0, 'English', 'The final battle for humanity.', 'The final battle for humanity.', 'A mix of traditional and AI techniques.', 'DALL-E 2, Stable Diffusion', 0, NULL, 'Pending'),
(3, 'El Sueño Perdido', 'The Lost Dream', NOW(), 'https://www.youtube.com/watch?v=video3', '/images/cover3.jpg', 110, 1, 'Spanish', 'Una historia de esperanza y desesperación.', 'A story of hope and despair.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub3.srt', 'Accepted'),
(4, 'Tokyo Drift', 'Tokyo Drift', NOW(), 'https://www.youtube.com/watch?v=video4', '/images/cover4.jpg', 100, 0, 'Japanese', 'Fast cars and neon lights.', 'Fast cars and neon lights.', 'Traditional animation with AI assistance for backgrounds.', 'Photoshop, Blender', 1, '/subs/sub4.srt', 'Pending'),
(5, 'Die Ewigkeit', 'Eternity', NOW(), 'https://www.youtube.com/watch?v=video5', '/images/cover5.jpg', 130, 1, 'German', 'Eine philosophische Reise durch die Zeit.', 'A philosophical journey through time.', 'AI-driven narrative generation.', 'GPT-3, Synthesia', 0, NULL, 'Cancelled');

-- Fixtures for Tag table
INSERT INTO Tag (id, name) VALUES
(1, 'Sci-Fi'),
(2, 'Animation'),
(3, 'Action'),
(4, 'Drama'),
(5, 'Fantasy'),
(6, 'Thriller');

-- Fixtures for Movie_Tag table
INSERT INTO Movie_Tag (movie_id, tag_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 4),
(3, 5),
(4, 3),
(4, 6),
(5, 1),
(5, 4);

-- Fixtures for Image table
INSERT INTO Image (id, movie_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 3),
(6, 4),
(7, 5);

-- Fixtures for Rating table
INSERT INTO Rating (id, note, Comment, user_id, movie_id) VALUES
(1, 8, 'Great movie, loved the visuals!', 1, 1),
(2, 9, 'Amazing storytelling.', 2, 1),
(3, 7, 'Good, but could be better.', 1, 2),
(4, 10, 'A masterpiece!', 3, 3),
(5, 6, 'Interesting concept, but execution was lacking.', 4, 4),
(6, 8, 'Very thought-provoking.', 5, 5);

-- Fixtures for Collaborator table
INSERT INTO Collaborator (id, gender, firstname, lastname, email, job, contribution, birthdate, country, phone, movie_id) VALUES
(1, 'Male', 'Alex', 'Martin', 'alex.martin@example.com', 'Director', 'Directed the movie', '1985-05-15', 'France', '+33123456789', 1),
(2, 'Female', 'Chloe', 'Dubois', 'chloe.dubois@example.com', 'Animator', 'Lead Animator', '1990-09-20', 'France', '+33987654321', 1),
(3, 'Male', 'Carlos', 'Gomez', 'carlos.gomez@example.com', 'Writer', 'Screenwriter', '1978-11-01', 'Spain', '+34123456789', 3),
(4, 'Female', 'Akiko', 'Tanaka', 'akiko.tanaka@example.com', 'Concept Artist', 'Character Design', '1992-03-25', 'Japan', '+819012345678', 4),
(5, 'Other', 'Max', 'Müller', 'max.muller@example.com', 'Sound Designer', 'Original Score', '1980-07-07', 'Germany', '+491701234567', 5);

-- Fixtures for Event table
INSERT INTO Event (id, title, description, status, start_at, duration, location) VALUES
(1, 'MarsAI Film Festival 2026', 'The first edition of the MarsAI Film Festival.', 'Scheduled', '2026-07-15 18:00:00', 3, 'Paris, France'),
(2, 'AI in Cinema Workshop', 'A workshop on the use of AI in modern cinema.', 'Scheduled', '2026-07-16 10:00:00', 2, 'Online'),
(3, 'Future of Storytelling Summit', 'Exploring new frontiers in narrative with AI.', 'Scheduled', '2026-09-01 09:00:00', 8, 'London, UK');

-- Fixtures for Participant table
INSERT INTO Participant (id, firstname, lastname, email) VALUES
(1, 'Paul', 'Henry', 'paul.henry@example.com'),
(2, 'Laura', 'Blanc', 'laura.blanc@example.com'),
(3, 'Sophie', 'Durand', 'sophie.durand@example.com');

-- Fixtures for Booking table
INSERT INTO Booking (id, participant_id, event_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 3, 1),
(5, 3, 3);