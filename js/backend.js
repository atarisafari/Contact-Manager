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

 
