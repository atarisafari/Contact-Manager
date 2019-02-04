<?php

include('establishConn.php');

$sql = $conn->prepare("DELETE FROM contact WHERE contact_id = ?");
$sql->bind_param('i', $contact_id);

//Receive JSON package from POST and assign to variables
$input = json_decode(file_get_contents('php://input'));

//Set parameters
$contact_id = $input->contact_id;

$sql->execute(); 
$sql->close();

?>
