--Project Manager

CREATE TABLE user_info(
	user_id INT AUTO_INCREMENT,--PRIMARY KEY, and it increaments automatically
	first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL,
	username VARCHAR(30) UNIQUE NOT NULL, --This entry needs to be unique
	passwordSalt VARCHAR(20) NOT NULL, --NOT NULL to force a password
	passwordHash VARCHAR(20) NOT NULL, 
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

CREATE TABLE groups(
	group_id INT AUTO_INCREMENT,
	group_name VARCHAR(40) NOT NULL;
	user_id INT NOT NULL,--foreign key
	PRIMARY KEY (group_id),
	FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);

CREATE TABLE group_members(
	group_id INT NOT NULL,--foreign key
	user_id INT NOT NULL,--foreign key
	contact_id INT NOT NULL, --foreign key
	FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
	FOREIGN KEY(group_id) REFERENCES groups(group_id) ON DELETE CASCADE,
	FOREIGN KEY(contact_id) REFERENCES contact(contact_id) ON DELETE CASCADE,
);


---------------------------------------------------------------------------------------------------
--								FUNCTIONS AND QUERIES
---------------------------------------------------------------------------------------------------
--NOTE: refer to tables for variable types. Example: all ID's are integers.

--DEFAULT FOR ALL CONTACTS IS GROUP "ALL", WHICH  CONTAINS ALL CONTACTS:
SELECT last_name, first_name, phone_number, email_address, birth_date, address
FROM contact
WHERE contact.user_id = 'USER ID HERE'
ORDER BY last_name, first_name, birth_date;

--FIND GROUP ALL ID OF GIVEN USER:
SELECT group_id
FROM groups
WHERE groups.user_id = 'USER ID HERE' AND group_name = 'ALL';

--Output all group names from user_id
SELECT group_name
FROM groups
WHERE groups.user_id = 'USER ID HERE';

--ADD 
	--CONTACT:
INSERT INTO contact VALUES(HERE contact_id_as_integer, 'last_name', 'first_name', 'phone_number', 'email_address', 'YYYY-MM-DD', 'address', user_id_as_integer);
	--GROUP:
INSERT INTO groups VALUES( group_id, 'group_name', user_id);
	--CONTACT TO GROUP (This function should always be called to add new contacts to group "ALL"):
INSERT INTO group_members VALUES( group_id, user_id, contact_id);
	
	
--DELETE:
	--CONTACT:
DELETE FROM contact
WHERE contact.contact_id = 'CONTACT ID HERE' AND contact.user_id = 'USER ID HERE';
	--GROUP:
DELETE FROM groups
WHERE groups.group_id = 'GROUP ID HERE' AND groups.user_id = 'USER ID HERE';
	--MEMBER FROM GROUP:
DELETE FROM group_members
WHERE group_members.group_id = 'GROUP ID HERE' AND group_members.user_id = 'USER ID HERE' AND group_members.contact_id = 'CONTACT ID HERE';
	
	
--EDIT:
	--CONTACT:
UPDATE contact
SET last_name = 'last_name', first_name = 'first_name', phone_number = 'phone_number', email_address = 'email_address', birth_date = 'YYYY-MM-DD', address = 'address'
WHERE contact.contact_id = 'CONTACT ID HERE' AND contact.user_id = 'USER ID HERE';
	--GROUP NAME:
UPDATE groups
SET group_name = 'NEW NAME HERE'
WHERE groups.group_id = 'GROUP ID HERE' AND groups.user_id = 'USER ID HERE';
	--GROUP MEMBER
--JUST DELETE AND ADD TO NEW GROUP

	
--SEARCH 
	--CONTACTS BY "keywod": last_name, first_name, phone_number, email_address, birth_date or address
SELECT last_name, first_name, phone_number, email_address, birth_date, address
FROM contact
WHERE contact.user_id = 'USER ID HERE' AND KEYWORD_HERE LIKE 'INPUT TO SEARCH HERE%';
	--GROUP BY group_name:
SELECT group_name
FROM groups
WHERE groups.user_id = 'USER ID HERE' AND group_name = '%INPUT HERE%';


--COUNT GROUPS:
SELECT DISTINCT COUNT(groups.group_id)
FROM groups
WHERE groups.user_id = 'USER ID HERE';


--COUNT MEMBERS IN A GROUP:
SELECT DISTINCT COUNT(group_members.contact_id)
FROM group_members
WHERE group_members.group_id = 'GROUP ID HERE' AND group_members.user_id = 'USER ID HERE';


--WARNING NEXT COMAND IS TO ERRASE ALL CONTENT IN THE DATABASE
DROP TABLE *;

