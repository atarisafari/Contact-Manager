--Project Manager

CREATE TABLE user_info(
	user_id INT AUTO_INCREMENT,--PRIMARY KEY, and it increaments automatically
	--first_name VARCHAR(40) NOT NULL,
	--last_name VARCHAR(40) NOT NULL,
	username VARCHAR(30) UNIQUE NOT NULL, --This entry needs to be unique
	--passwordSalt VARCHAR(20) NOT NULL, 
	passwordHash VARCHAR(40) NOT NULL, --NOT NULL to force a password
	PRIMARY KEY (user_id)
);

CREATE TABLE contact (
	contact_id INT AUTO_INCREMENT,
	last_name VARCHAR (40) DEFAULT ' ',
	first_name VARCHAR(40) NOT NULL,
	phone_number VARCHAR(15) ' ',
	email_address VARCHAR(50) ' ',
	birth_date DATE '1111-11-11',
	address VARCHAR(100) ' ',
	user_id INT, --foreign key
	PRIMARY KEY (contact_id),
	FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
	--CASCADE: If a record in the parent table is deleted, then the corresponding 
	--records in the child table will automatically be deleted.
);

--CREATE TABLE groups(
--	group_id INT AUTO_INCREMENT,
--	group_name VARCHAR(40) NOT NULL;
--	user_id INT NOT NULL,--foreign key
--	PRIMARY KEY (group_id),
--	FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
--);

--CREATE TABLE group_members(
--	group_id INT NOT NULL,--foreign key
--	user_id INT NOT NULL,--foreign key
--	contact_id INT NOT NULL, --foreign key
--	FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
--	FOREIGN KEY(group_id) REFERENCES groups(group_id) ON DELETE CASCADE,
--	FOREIGN KEY(contact_id) REFERENCES contact(contact_id) ON DELETE CASCADE,
--);
