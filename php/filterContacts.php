<?php
  
  include('establishConn.php');
  
  $sql="SELECT * FROM contact WHERE user_id=? and ((first_name like ?) or (last_name like ?) or (phone_number like ?) or (email_address like ?) or (address like ?) or (birth_date like ?))";
	$stmt = $conn->prepare($sql);
  $stmt->bind_param("sssssss", $userID, $text, $text, $text, $text, $text, $test);
  
  $input = json_decode(file_get_contents('php://input'), true);
  
  $userID = $input["user_id"];
  $text = "%".$input["text"]."%";
  
  $stmt->execute();
  $result = $stmt->get_result();
  $inData = $result->fetch_all();
  
  $obj='[';
	$length=sizeof($inData);
  
  header('Content-type: application/json');
  
	$i=0;
	while ($i<$length) {
		$object=$inData[$i];
			
		$obj=$obj.'{"contact_id": '.$object[0].', "last_name": "'.$object[1]."'
			.', "first_name": "'.$object[2].'"'
			.', "phone_number": "'.$object[3].'"'
			.', "email_address": "'.$object[4].'"'
			.', "birth_date": "'.$object[5].'"'
			.', "address": "'.$object[6].'"'
			.', "user_id": "'.$object[7].'"'
			.', "": "" }';
			if ($i+1<$length)
				$obj = $obj.", ";
			$i++;
		}
		$obj=$obj . ']';
    
		Echo($obj);
  
?>

