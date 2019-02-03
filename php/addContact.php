<?php

include('establishConn.php');

$sql = $conn->prepare("INSERT INTO contact (last_name, first_name, phone_number, email_address, birth_date, address) VALUES(?, ?, ?, ?, ?, ?)");
$sql->bind_param("ssss", $lastname, $firstname, $phoneNumber, $email, $birthday, $address);

/*

Receive JSON package from POST and assign to variables

Set parameters and execute
$lastname = 
$firstname = 
$phoneNumber = 
$email =
$birthday = 
$address =
$sql->execute();

*/

$sql->close();
$conn->close();



?>
