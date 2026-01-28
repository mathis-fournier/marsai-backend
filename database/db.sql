USE marsai_db;

-- Table: User
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL

);

-- Table: Newsletter
CREATE TABLE Newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    object VARCHAR(100) NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME
);

-- Table: Subscriber
CREATE TABLE Subscriber (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: Movie
CREATE TABLE Movie (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    original_title VARCHAR(255) NOT NULL,
    english_title VARCHAR(255) NOT NULL,
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    youtube_url VARCHAR(255) NOT NULL UNIQUE,
    cover_image VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    isHybrid BOOLEAN NOT NULL,
    original_language ENUM ('French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Swahili', 'Afrikaans', 'Hungarian', 'Romanian', 'Czech', 'Slovak', 'Bulgarian', 'Ukrainian', 'Catalan', 'Galician', 'Basque', 'Yoruba', 'Igbo', 'Hausa', 'Zulu', 'Amharic', 'Somali', 'Oromo', 'Xhosa', 'Tigrinya', 'Kinyarwanda', 'Lingala', 'Luganda', 'Shona', 'Twi', 'Wolof', 'Bengali', 'Urdu', 'Punjabi', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Burmese', 'Khmer', 'Lao', 'Nepali', 'Sinhala', 'Uzbek', 'Kazakh', 'Azerbaijani', 'Georgian', 'Armenian', 'Other') NOT NULL,
    original_synopsis TEXT NOT NULL,
    english_synopsis TEXT NOT NULL,
    creative_process TEXT NOT NULL,
    ia_tools TEXT NOT NULL,
    hasSubs BOOLEAN NOT NULL DEFAULT 0,
    srt VARCHAR(255),
    status ENUM('Pending', 'Cancelled', 'Accepted')
);

-- Table: Tag
CREATE TABLE Tag (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Table: Movie_Tag (Junction table for Many-to-Many relationship between Movie and Tag)
CREATE TABLE Movie_Tag (
    movie_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (movie_id, tag_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag(id) ON DELETE CASCADE
);

-- Table: Image
CREATE TABLE Image (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE
);

-- Table: Notification
-- CREATE TABLE Notification (
--     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     message TEXT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     user_id INT NOT NULL,
--     movie_id INT,
--     FOREIGN KEY (user_id) REFERENCES User(id),
--     FOREIGN KEY (movie_id) REFERENCES Movie(id)
-- );

-- Table: Rating
CREATE TABLE Rating (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    note INT NOT NULL CHECK (note >= 0 AND note <= 10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    Comment TEXT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE
);

-- Table: Comment
-- CREATE TABLE Comment (
--     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     comment TEXT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     user_id INT NOT NULL,
--     movie_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
--     FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE
-- );

-- Table: Collaborator
CREATE TABLE Collaborator (
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
    FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE
);

-- Table: Event
CREATE TABLE Event (
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

-- Table: Participant
CREATE TABLE Participant (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100)
);

-- Table: Booking
CREATE TABLE Booking (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    participant_id INT NOT NULL,
    event_id INT NOT NULL,
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    cancelled_at DATETIME,
    FOREIGN KEY (participant_id) REFERENCES Participant(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Event(id) ON DELETE CASCADE
);

-- Table: Role
CREATE TABLE Role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name ENUM('ADMIN', 'JURY') NOT NULL
);

-- Table: Role_User
CREATE TABLE Role_User (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE
);
