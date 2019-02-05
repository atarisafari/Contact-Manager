<?php

include('establishConn.php');

$sql = "SELECT * FROM contact WHERE user_id = ?";
$membership = 

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);

$input = json_decode(file_get_contents('php://input'));
$userID = $input->user_id;

$stmt->execute();
$result = $statement->get_result();

$stmt->close();
$conn->close();
