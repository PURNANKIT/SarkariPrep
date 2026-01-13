// run this in your postgresql before start project

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
mobile VARCHAR(20) NOT NULL,
job_preparation VARCHAR(255) NOT NULL,
preparation_year VARCHAR(10) NOT NULL,
password VARCHAR(255) NOT NULL,

    verification_token TEXT,
    verification_expires TIMESTAMP,
    is_verified BOOLEAN DEFAULT false,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

ALTER TABLE users
ADD COLUMN reset_password_token TEXT,
ADD COLUMN reset_password_expires TIMESTAMP;

ALTER TABLE users
ADD COLUMN is_online BOOLEAN DEFAULT false,
ADD COLUMN last_seen TIMESTAMP;

SELECT is_online, last_seen FROM users;

CREATE TABLE admins (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'admin',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE admins
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP;

ALTER TABLE admins
ADD COLUMN reset_token TEXT,
ADD COLUMN reset_expires TIMESTAMP;

select \* from admins;
DELETE FROM admins WHERE email = 'ad@gmail.com';

-- PRACTICE QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS practice_questions (
id SERIAL PRIMARY KEY,
job VARCHAR(255) NOT NULL,
question TEXT NOT NULL,
option_a TEXT,
option_b TEXT,
option_c TEXT,
option_d TEXT,
correct_answer VARCHAR(5)
);

-- SYLLABUS TABLE
CREATE TABLE IF NOT EXISTS syllabus (
id SERIAL PRIMARY KEY,
job VARCHAR(255) NOT NULL,
syllabus JSONB NOT NULL
);

-- EMAIL LOGS TABLE
CREATE TABLE IF NOT EXISTS email_logs (
id SERIAL PRIMARY KEY,
email VARCHAR(255),
token TEXT,
sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
message TEXT,
user_id VARCHAR(50) DEFAULT 'all',
created_at TIMESTAMP DEFAULT NOW()
);

SELECT \* FROM notifications;

-- Add type column to notifications table
ALTER TABLE notifications
ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'info',
ADD COLUMN IF NOT EXISTS read_by TEXT[] DEFAULT '{}';

-- If you haven't added the read_by column yet
ALTER TABLE notifications
ADD COLUMN IF NOT EXISTS read_by TEXT[] DEFAULT '{}';

-- Or create the table fresh
CREATE TABLE IF NOT EXISTS notifications (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
user_id VARCHAR(50) DEFAULT 'all',
type VARCHAR(20) DEFAULT 'info',
read_by TEXT[] DEFAULT '{}',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
