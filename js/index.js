// import {md5} from 'md5.js';
var baseURL = "/php";

//var userID = 0;

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
	xhr.open("POST", baseURL + "/signup.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(payload));
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
			} else{
			//Redirect to indexpage
			window.location = "index.html"; 
			}
			// Reset the HTML fields to blank
			document.getElementById('usernameSignUp').value = "";
			document.getElementById('passwordSignUp').value = "";
			document.getElementById('userPasswordConfirm').value = "";
			// document.getElementById('passwordCompareResult').innerHTML = error.message;
		}
	};
}

function doLogin() {
	//userID = 0;
	if (localStorage.getItem("userID") === null) {
		localStorage.clear();
	}
	
	var username = document.getElementById("userLogin").value;
	var password = md5(document.getElementById("userPassword").value);

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
		//console.log('current user:' + data.results);
		
		// userID = data.user_id;

		// Store
		localStorage.userID = data.user_id;

		var error = data.error;
		
		if(localStorage.userID == 0) {
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
	// userID = 0;
	localStorage.clear();
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
		user_id: localStorage.userID
	};
	
	console.log("JSON Payload: " + JSON.stringify(jsonPayload));

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/addContact.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	
		// Reset the HTML fields to blank

	document.getElementById('firstName').value = '';
	document.getElementById('lastName').value = '';
	document.getElementById('phoneNumber').value = '';
	document.getElementById('email').value = '';
	document.getElementById('birthDate').value = '';
	document.getElementById('address').value = '';

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
   	var target = document.getElementById('search').value;
   	lastSearch = target;
	
	//var payload = '{"search" : "' + target + '", "uID" : "' + userID + '"}';
	var payload = {
	user_id: localStorage.userID,
	text: target
    	};
	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/filterContacts.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(payload));
	xhr.onreadystatechange = function() {
    		if (this.readyState == 4)
		{
       			// Typical action to be performed when the document is ready:
      			//document.getElementById("searchResult").innerHTML = xhr.responseText;
			var data = JSON.parse(xhr.responseText);
			clearContacts();
			buildTableData(data);
		}
	};
}

function clearContacts(){
	var table = document.getElementById("contactsTable");
	var x = document.getElementById("contactsTable").rows.length;
	for(var i =0; i < x-1; i++){ //dont move the 0 it just works
		table.deleteRow(-1);
	}
}

// With checkbox
function deleteMultipleContacts()
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

//	No checkbox
function deleteContact(contactID) {


	//var payload = '{"userID" : "' + userID + '", "contactID" : "' + contactID + '"}';
	var payload = {
		contact_id: contactID
    	};

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/deleteContact.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	searchContacts();
}


function buildTableData(data)
{
	var table = document.getElementById("contactsTable");
    	var i;
    	if(!data)
    	{
      		console.log("data is not available");
      		return;
    	}
    	for (i = 0; i < data.length; i++) {
		var row = table.insertRow(-1);
		var firstName = row.insertCell(0);
		var lastName = row.insertCell(1);
		var phoneNumber = row.insertCell(2);
		var show = row.insertCell(3);
		firstName.innerHTML = data[i].first_name;
		lastName.innerHTML = data[i].last_name;
		phoneNumber.innerHTML = data[i].phone_number;
// 		show.id = data[i].contactId;
//<button id="searchButton" class="btn btn-default" onclick="searchContacts()">Search</button>
//data-toggle="modal" data-target="#myModal">Add</a>
// 		var showButton = document.createElement('button');
// 		showButton.innerHTML = 'More';
// 		showButton.id = "showButton";
// 		showButton.className += "btn btn-default";
//		document.getElementById("showButton").addEventListener("click",searchContacts);
// 		showButton.modal("toggle");
		//myModalEdit
//         	var deleteButton = document.createElement('input');
//         	deleteButton.type = "checkbox";
//         	deleteButton.style.visibility = "hidden";
//         	deleteButton.style.display = "none";
//         	deleteButton.className = "deleteButton";
	}
	
}

function fillTable()
{
    // var id = userCurrentlyLogged;

    if(localStorage.userID == 0) {
      console.log("no user is currently logged on");
      return;
    }
    //var jsonPayload = '{"function": "getContacts", "userID" : "' + id + '"}';
	
    var jsonPayload = {
	user_id: localStorage.userID
    };

	var xhr = new XMLHttpRequest();
	xhr.open("POST", baseURL + "/grabAllContacts.php", true);
	xhr.setRequestHeader("Content-type", "application/json; charset = UTF-8");
	xhr.send(JSON.stringify(jsonPayload));
	xhr.onreadystatechange = function() {
		if (this.readyState == 4)
		{
			// Typical action to be performed when the document is ready:
			document.getElementById("addContactResult").innerHTML = xhr.responseText;
			var data = JSON.parse(xhr.responseText);
			var error = data.error;
			if(error !== ""){
				document.getElementById('addContactResult').innerHTML = error;
				return;
			}
			//buildTableHeader();
			buildTableData(data.result);
			//tableData = data.results			
		}
	};
}
