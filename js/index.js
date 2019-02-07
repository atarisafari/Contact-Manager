import {md5} from 'md5.js';
var baseURL = "http://cop4331-2.com/API"

var userID = 0;

$(document).ready(function() {
	$('#userPassword').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
	        doLogin();
	    }
	});
});

$(document).ready(function() {
	$('#form-password-confirm').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
	        signup();
	    }
	});
});

$(document).ready(function() {
	$('#search-username').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
	        searchContacts();
	        return false;
	    }
	});
});

function doSignUp(){
	//make sure to store the users username and password for log in 
	var userName = document.getElementById("usernameSignUp").value;
	var password = document.getElementById("passwordSignUp").value;
	var passwordConfirm = document.getElementById("userPasswordConfirm").value;
	if (password !== passwordConfirm) {
		document.getElementById('passwordCompareResult').innerHTML = "Your passwords do not match. Please try again.";
		return;
	}

	password = md5(password);

	document.getElementById("passwordCompareResult").innerHTML = "";

	// replace with appropriate varaible names
	var payload = '{"username" : "' + userName + '", "passwordHash" : "' + password + '"}';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/AddUser.php", false);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");

	try {
		xhr.send(payload);

		var data = JSON.parse(xhr.responseText);
		var error = data.error;

		if(error !== "") {
			document.getElementById('passwordCompareResult').innerHTML = error;
			return;
		}
	}
	catch(error) {
		// include result of creation in HTML
		document.getElementById('passwordCompareResult').innerHTML = error.message;
	}
}

function doLogin() {

	userID = 0;

	var username = document.getElementById("userLogin").value;
	var password = md5(document.getElementById("userPassword").value);

  // line 23	<p id = "loginResult"></p> in index.php
  // line 234 <span id="loginResult"> </span> in index.html
  // Ensure that the HTML login result message is blank
	document.getElementById("loginResult").innerHTML = "";

  // Setup the JSON payload to send to the API
	var jsonPayload = '{"username" : "' + username + '", "passwordHash" : "' + password + '"}';
  console.log("JSON Payload: " + jsonPayload);

	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", baseURL + "/Login.php", false);
	xhttp.setRequestHeader("Content-type", "application/json; charset = UTF-8");

	try {
		xhttp.send(jsonPayload);
    console.log("***" + xhttp.responseText);

		var data = JSON.parse(xhttp.responseText);
    console.log('current user:' + data.results);
		userID = data.user_id;

		if(userID == 0) {
			document.getElementById('loginResult').innerHTML = "Invalid username/password. Please try again.";
			return;
		}

     // Reset the HTML fields to blank
		document.getElementById('userLogin').value = "";
		document.getElementById('userPassword').value = "";
	}
	catch(error) {
		// include result of login in HTML
		document.getElementById('loginResult').innerHTML = error.message;
	}
}

function doLogout() {
	userID = 0;
}

function addContact() {
  // Get from the HTML fields
   var firstname = document.getElementById('firstName').value;
   var lastname = document.getElementById('lastName').value;
   var phone_number = document.getElementById('phoneNumber').value;
   var email = document.getElementById('email').value;
   var birth_date = document.getElementById('birthDate').value;
   var address = document.getElementById('address').value;

   if(!firstname | !lastname) {
     console.log("Must fill out firstname and lastname in order to add a contact");
     var errorMessage = document.getElementById("loginResult");
     errorMessage.innerHTML = "Must fill out firstname and lastname in order to add a contact";
     return;
   }

   var jsonPayload = '{"last_name" : "' + last_name + '", "first_name" : "' + first_name + '", "phone_number" : "' + phone_number
   + '", "email_address" : "' + email_address + '", "birth_date" : "' + birth_date + '", "address" : "' + address + '", "user_id" : "' + userID + '"}';

   var xhr = new XMLHttpRequest();
   xhr.open("POST", baseURL + "/addContact.php", true);
   xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");

   try {
   	xhr.onreadystatechange = function(){
      // Operation is complete
   		if (xhr.readyState === 4){
  			 document.getElementById('firstName').value = '';
  			 document.getElementById('lastName').value = '';
  			 document.getElementById('phoneNumber').value = '';
  			 document.getElementById('email').value = '';
  			 document.getElementById('birthDate').value = '';
         		 document.getElementById('address').value = '';
   		}
   	}
      xhr.send(jsonPayload);
   }
   catch(error) {
      document.getElementById('addContactResult').innerHTML = error.message;
   }
}

function searchContacts() {
   clearContacts();
   var target = document.getElementById('search-username').value;
   lastSearch = target;

   var payload = '{"search" : "' + target + '", "uID" : "' + userID + '"}';

   var xhr = new XMLHttpRequest();
   xhr.open("POST", baseURL + "/SearchContact.php", true);
   xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");

   try {
   	xhr.send(payload);
  	xhr.onload = function () {
   	    if (xhr.readyState === xhr.DONE) {

		var data = JSON.parse(xhr.responseText);
		searchResult = data.result;
		for (str in searchResult){
			contact = searchResult[str].split(" | ");
			addContactRow(contact[1], contact[2], contact[3], contact[4], contact[0]);
		}
	}
      }
    }
    catch(error) {
		// include result of login in HTML
		document.getElementById('searchResultText').innerHTML = error.message;
    }
}


function deleteContacts()
{
  var nodeList = document.getElementsByClassName("");

  if(!nodeList)
  {
    console.log("table hasnt loaded yet");
    return;
  }
  for(var i = 0; i < nodeList.length; i++)
  {
    if(nodeList[i].checked)
    {
      var value = nodeList[i].parentNode.id;
      console.log("value is : " + value);
      var contactId = '"id" : "' + value + '"' ;
      var functionName = '"function" : "deleteContact",';
      var jsonPayload = "{"+functionName+contactId+"}";
      CallServerSide(jsonPayload);
    }
    if(i == nodeList.length - 1) break;
  }
  var errorMessage = document.getElementById("loginResult");
  errorMessage.innerHTML = "";

  // To prevent page refresh
  return false;
}
