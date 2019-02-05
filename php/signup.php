<?php

include('establishConn.php');

//Prepare and bind for insertion
$sql = $conn->prepare("INSERT INTO user_info (first_name, last_name, username, passwordSalt passwordHash) VALUES(?, ?, ?, ?, ?)");
$sql->bind_param("sssss", $firstname, $lastname, $username, $passwordSalt, $passwordHash);

$test = $conn->prepare("SELECT user_id FROM user_info WHERE username = ?)
$test->bind_param("s", $username);

//Get data from the JSON post
$input = json_decode(file_get_contents('php://input), true);

//Set parameters and execute
$firstname = $input["first_name"];   
$lastname = $input["last_name"];
$username = $input["username"];
$passwordSalt = $input["passwordSalt"];
$passwordHash = $input["passwordHash"];
  
$test->execute();
$result = $test->get_result();

if($result->num_rows > 0){
  //Error, username taken
}

else
  $sql->execute();

$sql->close();
$test->close();
$conn->close();


?>
