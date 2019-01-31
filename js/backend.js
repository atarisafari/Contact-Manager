var magicString = "FuckOffCunt";

function validateLogin(JSONpackage){
	
	//get parse the package 
	var userCreds = JSON.parse(JSONpackage);
	//obejct includes userName, password strings
	
	//get connection to the server
	var mysql = required('mysql');
	var con = mysql.createConnection({
		host: //need host
		user: //need user
		password: //need password
	});
	
	//trying connection
	con.connection(function(err){
		if err{
			throw err;
		}
	});
	
	
	
	var id = '';
	
	//querry the password
	con.query(	'SELECT user_id FROM user_info WHERE username = ' + userCreds.userName + 'AND passwordHash =  ' userCred.passHash + ' LIMIT 1', (err, id));
	
	//check to see if there was an error
	if(err){
		
		//if err, send user id of 0
		var newPackage =  '{"id" : "' +  0}';
	} else {
	
		//else, send back the user id
		var newPackage = '{"id" : "' +  id};'
	}
	
	//send it out
	try
	{
		xhr.send(jsonPayload);
	} catch(err){
		
		
	}
	//ending connection
	con.end(err);
}

//this not done
function addNewUser(JSONpackage){
	
	//depack this shit
	var userCreds = JSON.parse(JSONpackage);
	
	//connection to the server
	con.connection(function(err){
		if err{
			throw err;
		}
	});
	
	//add a new user into the table
	//con.query("INSERT INTO user_info ")
	
	con.end(err);
}

//get back contact into
function getContacts(JSONpackage){
	
	//depack this shit
	var Thing = JSON.parse(JSONpackage);
	
	//connection to the server
	con.connection(function(err){
		if err{
			throw err;
		}
	});

	con.end(err);
}

//edit contact info 
function editContact(JSONpackage){
	
	//depack this shit
	var Thing = JSON.parse(JSONpackage);
	
	//connection to the server
	con.connection(function(err){
		if err{
			throw err;
		}
	});

	con.end(err);
}

//add some contact into the database
function addContact(JSONpackage){
	
	//depack this shit
	var Thing = JSON.parse(JSONpackage);
	
	//connection to the server
	con.connection(function(err){
		if err{
			throw err;
		}
	});

	con.end(err);
	
}
