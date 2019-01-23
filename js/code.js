var userID = 0;
var userName = "";
var password = "";
//need to get the url for the site, it goes here
//var url = '';

function signup()
{

	//make sure to store the users username and password for log in 
	var userName = document.getElementById("userLogin").value;
	var password = document.getElementById("userPassword").value
 
}

function login()
{
	var newUserName = document.getElementById("newUserLogin").value;
	var newPassword = document.getElementById("newUserPassword").value

	//error handling of nonexistent string
	if(newUserName.length === 0)
	{
		alert("Please type in a username!");
	}

	if(newPassword.length === 0)
	{
		alert("How can you sign in without a password? Type one in!");
	}

	var jsonPayload = '{"login" : "' + userName + '", "password" : "' + password + '"}';
	//var url = url + '/Login.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		

	}

	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	

}

