<?php

include('establishConn.php');

$sql = "SELECT * FROM contact WHERE user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $_SESSION["user_id"]);
$stmt->execute();

$result = $statement->get_result();
//$info = $result->fetch_all();

if($result->num_rows > 0)
{
  while($row - $result->fetch_assoc())
  {
    echo "First Name: " . $row["first_name"]. " - Last Name: " . $row["last_name"]. " " . $row["phone_number"]. "<br>";
  }
}

$conn->close();
