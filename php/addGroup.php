<?php

  include('establishConn.php);

  $in = json_decode(file_get_contents('php://input'), true);

  // prepare and bind
  $sql = $conn->prepare("INSERT INTO groups (group_name, user_id) VALUES (?, ?, ?)");
  $sql->bind_param("si", $groupName, $userId);
  
  $sql->execute();
  
  // Closing the connection
  $sql->close();
  $conn->close();
  
  ?>
