 <?php

   include("establishConn.php");

   $sql = $conn->prepare("SELECT * FROM user_info WHERE username=? and passwordHash=?");
   $sql->bind_param("ss", $username, $passwordHash);
  
   $input = json_decode(file_get_contents('php://input'), true);

   $username = $input["username"];
   $passwordHash = $input["passwordHash"];

   $sql->execute();
   $response = $sql->get_result();

   if($response->num_rows == 0)
   {
      $error = "Incorrect username or password";
      $payload='{"user_id":0, "username":"", "password_hash":"", "error": "'.$error.'"}';
      header('Content-type: application/json');
      echo $payload
      return;
   }

   $retData = $response->fetch_all();
   $payload = '{"user_id":' . $id . ',"username":"' . $username . '","passwordHash":"' . $passwordHash . '"}';
   header('Content-type: application/json');
   echo $payload;


   $conn->close();
   $sql->close();

?>
  
