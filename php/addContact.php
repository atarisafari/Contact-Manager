<?php

include('establishConn.php');

$sql = $conn->prepare("INSERT INTO contact (last_name, first_name, phone_number, email_address, birth_date, address, user_id) VALUES(?, ?, ?, ?, ?, ?, ?)");
$sql->bind_param("ssssssi", $lastname, $firstname, $phoneNumber, $email, $birthday, $address, $userID);

//Receive JSON package from POST and assign to variables
$input = json_decode(file_get_contents('php://input'));

//Set parameters
$lastname = $input->last_name;
$firstname = $input->first_name;
$phoneNumber = $input->phone_number;
$email = $input->email_address;
$birthday = $input->birth_date;
$address = $input->address;
$userID = $input->user_id;
  
//Execute
$sql->execute();


$sql->close();
$conn->close();

?>
