// import {md5} from 'md5.js';
var baseURL = "/php";

var userID = 0;

console.log(window);

$(document).ready(function() {
	$('#userPassword').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
	        doLogin();
	    }
	});
});

$(document).ready(function() {
	$('#userPasswordConfirm').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
					// signup();
					doSignUp();
	    }
	});
});

$(document).ready(function() {
	$('#search').keydown(function (event) {
	    var keypressed = event.keyCode || event.which;
	    if (keypressed == 13) {
	        searchContacts();
	        return false;
	    }
	});
});

// doing this line below makes sure the code runs
// after the DOM tree has loaded into memory
$(document).ready(function(){
	// here im looking for the element in the DOM tree that
	// has the id of 'signup-button' denoted by the # symbole
	// and attach the click event
	$('#signup-button').click(function(e){
		// below we want to stop the default behavior for happening
		// when submitting a form
		e.preventDefault();

		// invoke func
		doSignUp();
	});
});

function doSignUp(){
	//make sure to store the users username and password for log in 
	var userName = document.getElementById("usernameSignUp").value;
	var password = document.getElementById("passwordSignUp").value;
	var passwordConfirm = document.getElementById("userPasswordConfirm").value;
	
	if (userName == "") {
		document.getElementById('passwordCompareResult').innerHTML = "Please enter a username.";
		return;
	}
	if (password == "") {
		document.getElementById('passwordCompareResult').innerHTML = "Please enter a password.";
		return;
	}
	if (password !== passwordConfirm) {
		document.getElementById('passwordCompareResult').innerHTML = "Your passwords do not match. Please try again.";
		return;
	}

	password = md5(password);

	document.getElementById("passwordCompareResult").innerHTML = "";

	// replace with appropriate varaible names
	// var payload = '{"username" : "' + userName + '", "passwordHash" : "' + password + '"}';

	// lets create the json body as an object first
	var payload = {
		username: userName,
		passwordHash: password
	};

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    		if (this.readyState == 4)
		{
       			// Typical action to be performed when the document is ready:
      			document.getElementById("passwordCompareResult").innerHTML = xhr.responseText;
    		
			var data = JSON.parse(xhr.responseText);
			var error = data.error;

			if(error !== "")
			{
				document.getElementById('passwordCompareResult').innerHTML = error;
				return;
			}
			// document.getElementById('passwordCompareResult').innerHTML = error.message;
		}
	};
	xhr.open("POST", baseURL + "/signup.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(payload));
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
	//var jsonPayload = '{"username" : "' + username + '", "passwordHash" : "' + password + '"}';
	var jsonPayload = {
		username: username,
		passwordHash: password
	};
	
	console.log("JSON Payload: " + JSON.stringify(jsonPayload));

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/login.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	xhr.onreadystatechange = function() {
		console.log("***" + xhr.responseText);

		var data = JSON.parse(xhr.responseText);
		console.log('current user:' + data.results);
		userID = data.user_id;
		var error = data.error;
		if(userID == 0) {
			document.getElementById('loginResult').innerHTML = "Invalid username/password. Please try again.";
			return;
		}
		if(error !== ""){
			document.getElementById('loginResult').innerHTML = error;
			return;
		}
		window.location = "contactpage.html"; //Redirect to contactpage if login success
     		// Reset the HTML fields to blank
		document.getElementById('userLogin').value = "";
		document.getElementById('userPassword').value = "";
		
		fillTable();
	};

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
		var errorMessage = document.getElementById('addContactResult');
		errorMessage.innerHTML = "Must fill out firstname and lastname in order to add a contact";
		return;
	}
	
	var jsonPayload = {
		last_name: lastname,
		first_name: firstname,
		phone_number: phone_number,
		email_address: email,
		birth_date: birth_date,
		address: address,
		user_id: userID
	};
	
	console.log("JSON Payload: " + JSON.stringify(jsonPayload));

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/addContact.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	
	xhr.onreadystatechange = function() {
		console.log("***" + xhr.responseText);

		var data = JSON.parse(xhr.responseText);
		console.log('current user:' + data.results);
		
		var error = data.error;
		
		if(error !== ""){
			document.getElementById('addContactResult').innerHTML = error;
			return;
		}
		// Reset the HTML fields to blank
		
		document.getElementById('firstName').value = '';
		document.getElementById('lastName').value = '';
		document.getElementById('phoneNumber').value = '';
		document.getElementById('email').value = '';
		document.getElementById('birthDate').value = '';
		document.getElementById('address').value = '';
		
	};
	clearContacts();
	fillTable();
	
	/*
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
	*/
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

function clearContacts(){
    var table = document.getElementById("search-table").getElementsByTagName("tbody")[0];
    var children = table.getElementsByTagName("tr");

    while(children.length > 1){
        table.removeChild(children[1]);
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

function buildTableHeader()
{
	var tud = document.getElementById("contactsTable");
    	tud.innerHTML = "";
   	var thr = document.createElement('tr');
    	var firstNameHeader = document.createElement('th');
    	firstNameHeader.innerHTML = 'First Name';
    	var lastNameHeader = document.createElement('th');
    	lastNameHeader.innerHTML = 'Last Name';
//     	var phoneNumberHeader = document.createElement('th');
//     	phoneNumberHeader.innerHTML = 'Phone Number';
//     	var emailHeader = document.createElement('th');
//     	emailHeader.innerHTML = 'Email';
// 	var addressHeader = document.createElement('th');
//     	addressHeader.innerHTML = 'Address';
// 	var birthDateHeader = document.createElement('th');
//     	birthDateHeader.innerHTML = 'Birthday';
	var showHeader = document.createElement('th');
    	showHeader.innerHTML = 'Show';
   	showHeader.style.visibility = 'hidden';
   	showHeader.style.display = 'none';
    	showHeader.id = "showHeader";
     	var deleteHeader = document.createElement('th');
    	deleteHeader.innerHTML = 'Delete';
   	deleteHeader.style.visibility = 'hidden';
   	deleteHeader.style.display = 'none';
    	deleteHeader.id = "deleteHeader";

    	thr.appendChild(firstNameHeader);
    	thr.appendChild(lastNameHeader);
//     	thr.appendChild(phoneNumberHeader);
//     	thr.appendChild(emailHeader);
//    	thr.appendChild(addressHeader);
// 	thr.appendChild(birthDateHeader);
    	tud.appendChild(thr);
}

function buildTableData(data)
{
	var tud = document.getElementById("contactsTable");
    	var i;
    	if(!data)
    	{
      		console.log("data is not available");
      		return;
    	}
    	for (i = 0; i < data.length; i++) {
        	var tableRow = document.createElement('tr');
        	tableRow.id = data[i].contactId;
       	 	var firstName = document.createElement('td');
        	firstName.innerHTML = data[i].firstName;
        	var lastName = document.createElement('td');
        	lastName.innerHTML = data[i].lastName;
//         	var phoneNumber = document.createElement('td');
//         	phoneNumber.innerHTML = data[i].phoneNumber;
//        	var emailAddress = document.createElement('td');
//         	emailAddress.innerHTML = data[i].emailAddress;
// 		var address = document.createElement('td');
//         	address.innerHTML = data[i].address;
// 		var birthDate = document.createElement('td');
//         	birthDate.innerHTML = data[i].birthDate;
		//<button id="searchButton" class="btn btn-default" onclick="searchContacts()">Search</button>
		var showButton = document.createElement('button');
		showButton.innerHTML = 'Show';
		showButton.id = "showButton";
		showButton.class = "btn btn-default";
		showButton.onclick = function() {searchContacts()};
        	var deleteButton = document.createElement('input');
        	deleteButton.type = "checkbox";
        	deleteButton.style.visibility = "hidden";
        	deleteButton.style.display = "none";
        	deleteButton.className = "deleteButton";
        	tableRow.appendChild(firstName);
        	tableRow.appendChild(lastName);
		tableRow.appendChild(showButton);
//         	tableRow.appendChild(phoneNumber);
//         	tableRow.appendChild(emailAddress);
//         	tableRow.appendChild(deleteButton);
// 		tableRow.appendChild(address);
// 		tableRow.appendChild(birthDate);
        	tud.appendChild(tableRow);
	}
}

function fillTable()
{
    // var id = userCurrentlyLogged;

    if(userID == 0) {
      console.log("no user is currently logged on");
      return;
    }
    //var jsonPayload = '{"function": "getContacts", "userID" : "' + id + '"}';
	
    var jsonPayload = {
	user_id: userID
    };

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/grabAllContacts.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	xhr.onreadystatechange = function() {
		if (this.readyState == 4)
		{
			// Typical action to be performed when the document is ready:
			document.getElementById("contactResult").innerHTML = xhr.responseText;
			var data = JSON.parse(xhr.responseText);
			var error = data.error;
			if(error !== ""){
				document.getElementById('contactResult').innerHTML = error;
				return;
			}
			buildTableHeader();
			buildTableData(data.results);
			//tableData = data.results			
		}
	};
}
