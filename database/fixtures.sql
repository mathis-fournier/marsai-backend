USE marsai;

SET FOREIGN_KEY_CHECKS = 0;

-- Vider les tables dans un ordre qui respecte les contraintes
DELETE FROM role_user;
DELETE FROM booking;
DELETE FROM rating;
DELETE FROM collaborator;
DELETE FROM image;
DELETE FROM movie_tag;
DELETE FROM participant;
DELETE FROM event;
DELETE FROM tag;
DELETE FROM role;
DELETE FROM movie;
DELETE FROM user;
DELETE FROM subscriber;
DELETE FROM newsletter;

-- Réinitialiser l'auto-incrémentation pour chaque table
ALTER TABLE user AUTO_INCREMENT = 1;
ALTER TABLE role AUTO_INCREMENT = 1;
ALTER TABLE role_user AUTO_INCREMENT = 1;
ALTER TABLE newsletter AUTO_INCREMENT = 1;
ALTER TABLE subscriber AUTO_INCREMENT = 1;
ALTER TABLE movie AUTO_INCREMENT = 1;
ALTER TABLE tag AUTO_INCREMENT = 1;
ALTER TABLE movie_tag AUTO_INCREMENT = 1;
ALTER TABLE image AUTO_INCREMENT = 1;
ALTER TABLE rating AUTO_INCREMENT = 1;
ALTER TABLE collaborator AUTO_INCREMENT = 1;
ALTER TABLE event AUTO_INCREMENT = 1;
ALTER TABLE participant AUTO_INCREMENT = 1;
ALTER TABLE booking AUTO_INCREMENT = 1;


-- Fixtures for User table
INSERT INTO user (email, password, firstname, lastname) VALUES
('john.doe@example.com', 'password123', 'John', 'Doe'),
('jane.smith@example.com', 'password456', 'Jane', 'Smith'),
('admin@marsai.com', 'adminpass', 'Admin', 'User'),
('peter.jones@example.com', 'securepass', 'Peter', 'Jones'),
('mary.williams@example.com', 'mysecret', 'Mary', 'Williams');

-- Fixtures for Role table
INSERT INTO role (name) VALUES
('ADMIN'),
('JURY');

-- Fixtures for Role_User table
INSERT INTO role_user (user_id, role_id) VALUES
(1, 2),
(2, 2),
(3, 1),
(4, 2),
(5, 2);

-- Fixtures for Newsletter table
INSERT INTO newsletter (object, content, created_at, sent_at) VALUES
('Welcome to MarsAI!', 'This is the first newsletter.', NOW(), NOW()),
('Latest Movie Submissions', 'Check out the latest movies submitted to our platform.', NOW(), NULL),
('Upcoming Events', 'Don''t miss our next workshops and festivals!', NOW(), NOW());

-- Fixtures for Subscriber table
INSERT INTO subscriber (email, created_at) VALUES
('subscriber1@example.com', NOW()),
('subscriber2@example.com', NOW()),
('subscriber3@example.com', NOW());


-- Fixtures for Movie table
INSERT INTO movie (original_title, english_title, youtube_url, cover_image, duration, is_hybrid, original_language, original_synopsis, english_synopsis, creative_process, ia_tools, has_subs, srt, status) VALUES
('Le Voyage Imaginaire', 'The Imaginary Journey', 'https://www.youtube.com/embed/vPY3OEECHPg?si=kDDHS0mPuDuTnpzH', '/batman.png', 120, 1, 'French', 'Un voyage incroyable...', 'An incredible journey...', 'Lots of AI tools were used.', 'Midjourney, RunwayML', 1, '/subs/sub1.srt', 'Accepted'),
('The Last Stand', 'The Last Stand', 'https://www.youtube.com/embed/0hSonCi834w?si=ZliyVPxDUqe-zfGj', '/batman.png', 95, 0, 'English', 'The final battle for humanity.', 'The final battle for humanity.', 'A mix of traditional and AI techniques.', 'DALL-E 2, Stable Diffusion', 0, NULL, 'Pending'),
('El Sueño Perdido', 'The Lost Dream', 'https://www.youtube.com/embed/QfpoU0iln9M?si=m7Hxg0Zh2SEG_lFd', '/batman.png', 110, 1, 'Spanish', 'Una historia de esperanza y desesperación.', 'A story of hope and despair.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub3.srt', 'Accepted'),
('Tokyo Drift', 'Tokyo Drift', 'https://www.youtube.com/embed/Vu9hj_kMm48?si=wc8dA2M6wgdj9QqB', '/batman.png', 100, 0, 'Japanese', 'Fast cars and neon lights.', 'Fast cars and neon lights.', 'Traditional animation with AI assistance for backgrounds.', 'Photoshop, Blender', 1, '/subs/sub4.srt', 'Pending'),
('Die Ewigkeit', 'Eternity', 'https://www.youtube.com/embed/MefH473iygA?si=ivwXVb5d5ZdiMmX9', '/batman.png', 130, 1, 'German', 'Eine philosophische Reise durch die Zeit.', 'A philosophical journey through time.', 'AI-driven narrative generation.', 'GPT-3, Synthesia', 0, NULL, 'Cancelled'),
('Inception', 'Inception', 'https://www.youtube.com/embed/YoHECMk3E1s?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 148, 1, 'English', 'Un film sur les rêves et la réalité.', 'A film about dreams and reality.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub5.srt', 'Accepted'),
('Interstellar', 'Interstellar', 'https://www.youtube.com/embed/0O2aC6N3etz?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 169, 1, 'English', 'Un voyage dans lespace.', 'A journey through space.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub6.srt', 'Accepted'),
('The Matrix', 'The Matrix', 'https://www.youtube.com/embed/m8e-FF8MsSg?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 136, 1, 'English', 'Un film sur la réalité et les rêves.', 'A film about reality and dreams.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub7.srt', 'Accepted'),
('The Prestige', 'The Prestige', 'https://www.youtube.com/embed/aIIMT3ZkNjw?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 130, 1, 'English', 'Un film sur les magiciens et la rivalité.', 'A film about magicians and rivalry.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub8.srt', 'Accepted'),
('The Dark Knight', 'The Dark Knight', 'https://www.youtube.com/embed/EXeTwQWrcwY?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 152, 1, 'English', 'Un film sur Batman et le Joker.', 'A film about Batman and the Joker.', 'Entirely AI-generated visuals.', 'Artbreeder, DeepMotion', 1, '/subs/sub9.srt', 'Accepted'),
('Parasite', 'Parasite', 'https://www.youtube.com/embed/5OGgXoN3bjo?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 132, 1, 'Korean', 'Une famille pauvre se glisse dans la maison d’une famille riche.', 'A poor family infiltrates the home of a wealthy family.', 'Combination of traditional and AI-generated elements.', 'After Effects, Blender', 1, '/subs/sub10.srt', 'Accepted'),
('Moonlight', 'Moonlight', 'https://www.youtube.com/embed/9NJ2a8m7zjE?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 112, 1, 'English', 'L’histoire d’un jeune homme noir à Miami.', 'The story of a young black man in Miami.', 'AI-driven character development and animation.', 'Adobe Character Animator, Blender', 1, '/subs/sub11.srt', 'Accepted'),
('Green Book', 'Green Book', 'https://www.youtube.com/embed/xhbz5ZDF9Nk?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 134, 1, 'English', 'Un pianiste noir voyage avec un guide blanc.', 'A black pianist travels with a white guide.', 'AI-assisted scriptwriting and animation.', 'Quillbot, Blender', 1, '/subs/sub12.srt', 'Accepted'),
('The Shape of Water', 'The Shape of Water', 'https://www.youtube.com/embed/5PawbVSHtiQ?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 123, 1, 'English', 'Un pianiste sousaquatique tombe amoureuse d’une sirène.', 'A musical underwater love story.', 'AI-generated aquatic scenes and creatures.', 'Weta Digital, Blender', 1, '/subs/sub13.srt', 'Accepted'),
('Juno', 'Juno', 'https://www.youtube.com/embed/0n2KZIcCvBw?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 94, 1, 'English', 'Une jeune femme enceinte se réfugie dans une famille.', 'A pregnant teenager finds refuge in a family.', 'AI-assisted character animation and voiceovers.', 'After Effects, Motion Twin', 1, '/subs/sub14.srt', 'Accepted'),
('La La Land', 'La La Land', 'https://www.youtube.com/embed/0pdqf4P9MB8?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 128, 1, 'English', 'Un acteur danseur tombe amoureuse d’une pianiste.', 'A dancer falls in love with a pianist.', 'AI-generated dance choreography and visuals.', 'After Effects, Houdini', 1, '/subs/sub15.srt', 'Accepted'),
('The Grand Budapest Hotel', 'The Grand Budapest Hotel', 'https://www.youtube.com/embed/4lsazd0nxIw?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 99, 1, 'English', 'Un hôtel de luxe dans une ville post-guerre.', 'A luxury hotel in a post-war city.', 'AI-assisted animation and visual effects.', 'Blender, DaVinci Resolve', 1, '/subs/sub16.srt', 'Accepted'),
('Goodfellas', 'Goodfellas', 'https://www.youtube.com/embed/5IBpT4J9e3Q?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 145, 1, 'English', 'La vie d’un jeune gangster dans New York.', 'The life of a young gangster in New York.', 'AI-generated crime scenes and character models.', 'Autodesk Maya, Blender', 1, '/subs/sub17.srt', 'Accepted'),
('Fight Club', 'Fight Club', 'https://www.youtube.com/embed/SUXWAEX2jlg?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 139, 1, 'English', 'Deux hommes tombent amoureux de la mêlée.', 'Two men fall in love with the fight.', 'AI-assisted scene transitions and character expressions.', 'Adobe After Effects, Blender', 1, '/subs/sub18.srt', 'Accepted'),
('Pulp Fiction', 'Pulp Fiction', 'https://www.youtube.com/embed/6l8zCl09WmM?si=J8Hxg0Zh2SEG_lFd', '/batman.png', 154, 1, 'English', 'Une série de histoires interconnectées.', 'A series of interconnected stories.', 'AI-generated dialogue and action sequences.', 'Adobe Premiere Pro, Blender', 1, '/subs/sub19.srt', 'Accepted');


-- Fixtures for Tag table
INSERT INTO tag (name) VALUES
('Sci-Fi'),
('Animation'),
('Action'),
('Drama'),
('Fantasy'),
('Thriller');

-- Fixtures for Movie_Tag table
INSERT INTO movie_tag (movie_id, tag_id) VALUES
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
INSERT INTO image (movie_id) VALUES
(1),
(1),
(2),
(3),
(3),
(4),
(5);

-- Fixtures for Rating table
INSERT INTO rating (note, comment, user_id, movie_id) VALUES
(8, 'Great movie, loved the visuals!', 1, 1),
(9, 'Amazing storytelling.', 2, 1),
(7, 'Good, but could be better.', 1, 2),
(10, 'A masterpiece!', 3, 3),
(6, 'Interesting concept, but execution was lacking.', 4, 4),
(8, 'Very thought-provoking.', 5, 5);

-- Fixtures for Collaborator table
INSERT INTO collaborator (gender, firstname, lastname, email, job, contribution, birthdate, country, phone, movie_id) VALUES
('Male', 'Alex', 'Martin', 'alex.martin@example.com', 'Director', 'Directed the movie', '1985-05-15', 'France', '+33123456789', 1),
('Female', 'Chloe', 'Dubois', 'chloe.dubois@example.com', 'Animator', 'Lead Animator', '1990-09-20', 'France', '+33987654321', 1),
('Male', 'Carlos', 'Gomez', 'carlos.gomez@example.com', 'Writer', 'Screenwriter', '1978-11-01', 'Spain', '+34123456789', 3),
('Female', 'Akiko', 'Tanaka', 'akiko.tanaka@example.com', 'Concept Artist', 'Character Design', '1992-03-25', 'Japan', '+819012345678', 4),
('Other', 'Max', 'Müller', 'max.muller@example.com', 'Sound Designer', 'Original Score', '1980-07-07', 'Germany', '+491701234567', 5);

-- Fixtures for Event table
INSERT INTO event (title, description, status, start_at, duration, location) VALUES
('MarsAI Film Festival 2026', 'The first edition of the MarsAI Film Festival.', 'Scheduled', '2026-07-15 18:00:00', 3, 'Paris, France'),
('AI in Cinema Workshop', 'A workshop on the use of AI in modern cinema.', 'Scheduled', '2026-07-16 10:00:00', 2, 'Online'),
('Future of Storytelling Summit', 'Exploring new frontiers in narrative with AI.', 'Scheduled', '2026-09-01 09:00:00', 8, 'London, UK');

-- Fixtures for Participant table
INSERT INTO participant (firstname, lastname, email) VALUES
('Paul', 'Henry', 'paul.henry@example.com'),
('Laura', 'Blanc', 'laura.blanc@example.com'),
('Sophie', 'Durand', 'sophie.durand@example.com');

-- Fixtures for Booking table
INSERT INTO booking (participant_id, event_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(3, 3);

SET FOREIGN_KEY_CHECKS = 1;