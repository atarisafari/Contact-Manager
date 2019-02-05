<?php

include('establishConn.php');

$sql = "SELECT * FROM contact WHERE user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);

$input = json_decode(file_get_contents('php://input'));
$userID = $input->user_id;

$stmt->execute();
$result = $statement->get_result();

header('Content-type: application/json');

if($result->num_rows > 0)
{
  while($row - $result->fetch_assoc())
  {
    echo "First Name: " . $row["first_name"]. " - Last Name: " . $row["last_name"]. " " . $row["phone_number"]. "<br>";
  }
}

$stmt->close();
$conn->close();
