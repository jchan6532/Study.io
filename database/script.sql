-- Load the uuid-ossp module; run this once
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the Users table
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    user_name VARCHAR(255) NOT NULL
);

-- Create the Courses table
CREATE TABLE Study_Material (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(id),
    title TEXT NOT NULL
);

-- Create Quizzes table
CREATE TABLE Quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(id)
);

-- Create Quiz_Answers table with a UUID primary key
CREATE TABLE Quiz_Answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answer TEXT NOT NULL UNIQUE
);

CREATE TABLE MCQS (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	mcq_options TEXT[],
	mcq_answer CHAR(1)
);

-- Create Quiz Questions table
CREATE TABLE Quiz_Questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES Quizzes(id),
    question TEXT NOT NULL,
	isMCQ BOOLEAN NOT NULL,
	mcq_id UUID REFERENCES MCQS(id),
	answer_id UUID REFERENCES Quiz_Answers(id),
    answered_right BOOLEAN NOT NULL
);

-- Create Marks table
CREATE TABLE Marks (
    id UUID PRIMARY KEY NOT NULL,
    quiz_id UUID REFERENCES Quizzes(id),
    total_marks INT CHECK (total_marks > 0),
    scored_marks INT CHECK (scored_marks >= 0 AND scored_marks <= total_marks),
    percentage numeric(5, 2)
);