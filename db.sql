-- todo: fix to follow correct syntax
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- todo: delete completed column
CREATE TABLE habits (
	id INT AUTO_INCREMENT PRIMARY KEY,
	habit VARCHAR(100) NOT NULL,
	completed BOOLEAN,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	FOREIGN KEY	(user_id) REFERENCES users(id)
);

CREATE TABLE completion_history (
	id INT AUTO_INCREMENT PRIMARY KEY,
	completion_check BOOLEAN,
	date VARCHAR(100) NOT NULL,
	user_id INT,
	habit_id INT,
	FOREIGN KEY	(user_id) REFERENCES users(id),
	FOREIGN KEY (habit_id) REFERENCES habits(id)
);

CREATE TABLE dates (
	id INT AUTO_INCREMENT PRIMARY KEY,
	date VARCHAR(100) NOT NULL,
	user_id INT,
	FOREIGN KEY	(user_id) REFERENCES users(id)
);
