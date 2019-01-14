var userID = 0;
var userName = "";
var password = "";

function login()
{

	//make sure to store the users username and password for log in 
	var userName = document.getElementById("userLogin").value;
	var password = document.getElementById("userPassword").value
}

function signUp()
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
}
