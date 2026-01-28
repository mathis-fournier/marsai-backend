-- 1. Sélection de la base
CREATE DATABASE IF NOT EXISTS marsai;
USE marsai;

SET FOREIGN_KEY_CHECKS = 0;

-- Table: user
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL
);

-- Table: newsletter
DROP TABLE IF EXISTS newsletter;
CREATE TABLE newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    object VARCHAR(100) NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME
);

-- Table: subscriber
DROP TABLE IF EXISTS subscriber;
CREATE TABLE subscriber (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: movie
DROP TABLE IF EXISTS movie;
CREATE TABLE movie (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    original_title VARCHAR(255) NOT NULL,
    english_title VARCHAR(255) NOT NULL,
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    youtube_url VARCHAR(255) NOT NULL UNIQUE,
    cover_image VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    is_hybrid BOOLEAN NOT NULL,  -- J'ai passé isHybrid en is_hybrid (snake_case)
    original_language ENUM ('French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Swahili', 'Afrikaans', 'Hungarian', 'Romanian', 'Czech', 'Slovak', 'Bulgarian', 'Ukrainian', 'Catalan', 'Galician', 'Basque', 'Yoruba', 'Igbo', 'Hausa', 'Zulu', 'Amharic', 'Somali', 'Oromo', 'Xhosa', 'Tigrinya', 'Kinyarwanda', 'Lingala', 'Luganda', 'Shona', 'Twi', 'Wolof', 'Bengali', 'Urdu', 'Punjabi', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Burmese', 'Khmer', 'Lao', 'Nepali', 'Sinhala', 'Uzbek', 'Kazakh', 'Azerbaijani', 'Georgian', 'Armenian', 'Other') NOT NULL,
    original_synopsis TEXT NOT NULL,
    english_synopsis TEXT NOT NULL,
    creative_process TEXT NOT NULL,
    ia_tools TEXT NOT NULL,
    has_subs BOOLEAN NOT NULL DEFAULT 0, -- J'ai passé hasSubs en has_subs
    srt VARCHAR(255),
    status ENUM('Pending', 'Cancelled', 'Accepted') DEFAULT 'Pending'
);

-- Table: tag
DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Table: movie_tag (Table de liaison)
DROP TABLE IF EXISTS movie_tag;
CREATE TABLE movie_tag (
    movie_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (movie_id, tag_id),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

-- Table: image
DROP TABLE IF EXISTS image;
CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

-- Table: rating
DROP TABLE IF EXISTS rating;
CREATE TABLE rating (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    note INT NOT NULL CHECK (note >= 0 AND note <= 10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    comment TEXT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

-- Table: collaborator
DROP TABLE IF EXISTS collaborator;
CREATE TABLE collaborator (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    job VARCHAR(100),
    contribution VARCHAR(100),
    birthdate DATE NOT NULL,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    city VARCHAR(100),
    address VARCHAR(255),
    zipcode VARCHAR(20),
    phone VARCHAR(50) NOT NULL,
    facebook_url VARCHAR(255),
    instagram_url VARCHAR(255),
    youtube_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    movie_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

-- Table: event
DROP TABLE IF EXISTS event;
CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('Scheduled', 'Cancelled', 'Completed'),
    start_at DATETIME,
    duration INT,
    location VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at DATETIME
);

-- Table: participant
DROP TABLE IF EXISTS participant;
CREATE TABLE participant (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100)
);

-- Table: booking
DROP TABLE IF EXISTS booking;
CREATE TABLE booking (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    participant_id INT NOT NULL,
    event_id INT NOT NULL,
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    cancelled_at DATETIME,
    FOREIGN KEY (participant_id) REFERENCES participant(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

-- Table: role
DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name ENUM('ADMIN', 'JURY') NOT NULL
);

-- Table: role_user
DROP TABLE IF EXISTS role_user;
CREATE TABLE role_user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;
