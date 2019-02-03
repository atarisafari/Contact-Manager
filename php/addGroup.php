<?php
  include('establishConn.php);
  Session_start();

  /*
    Get The json from the javascript and put the information into the groupName and userId variable
  */

  // prepare and bind
  $sql = $conn->prepare("INSERT INTO groups (group_name, user_id) VALUES (?, ?, ?)");
  $sql->bind_param("sss", $groupName, $userId);
  
  $sql->execute();
  
  // Closing the connection
  $sql->close();
  $conn->close();
  
  ?>
