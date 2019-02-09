<?php
	
  require ('establishConn.php');
 
	$sql="UPDATE contact set last_name=?, first_name=?, phone_number=?, email_address=?, birth_date=?, address=?".
		"WHERE contact_id=?;";
	
	$stmt= $conn->prepare($sql);
	$stmt->bind_param("ssssssss", $lastName, $firstName, $phoneNum, $email, $address, $birthday, $contactId);
  
  $input = json_decode(file_get_contents('php://input'), true);
  
	$firstName = $input["first_name"];
	$lastName = $input["last_name"];
	$phone = $input["phone_number"];
	$email = $input["email_address"];
	$address = $input["address"];
	$birthdate = $input["birth_date"];
	$contactId = $input["contact_id"];
  
	$stmt->execute();
  
  $stmt->close();
	$conn->close();
	
?>
