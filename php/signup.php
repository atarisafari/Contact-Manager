<?php

include('establishConn.php');

//Prepare and bind
$sql = $conn->prepare("INSERT INTO user_info (first_name, last_name, username, passwordHash) VALUES(?, ?, ?, ?)");
$sql->bind_param("ssss", $firstname, $lastname, $username, $password);

/*

Get data from the JSON post

Set parameters and execute
$firstname = 
$lastname = 
$username =
$password =
$sql->execute();
*/

$sql->close();
$conn->close();


?>
