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
