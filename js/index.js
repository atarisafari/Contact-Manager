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
   var firstname = document.getElementById('').value;
   var lastname = document.getElementById('').value;
   var phone_number = document.getElementById('').value;
   var email = document.getElementById('').value;
   var birth_date = document.getElementById('').value;
   var address = document.getElementById('').value;

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
  			 document.getElementById('').value = '';
  			 document.getElementById('').value = '';
  			 document.getElementById('').value = '';
  			 document.getElementById('').value = '';
  			 document.getElementById('').value = '';
         document.getElementById('').value = '';
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
https://github.com/matthewgarrison/COP4331-Small-Project/blob/master/src/scripts/code.js
