DROP DATABASE IF EXISTS todolist;
CREATE DATABASE todolist;

\c todolist;

CREATE TABLE users (
	
	username text PRIMARY KEY,
	password text
);

CREATE TABLE thingstodo (
	name text REFERENCES users(username),
	item text
);

INSERT INTO users (username, password) VALUES ('JOHN DOE', '123'), ('JANE DOE', '987');