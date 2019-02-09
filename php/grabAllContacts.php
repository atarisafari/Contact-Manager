<?php

include('establishConn.php');

$sql = "SELECT * FROM contact WHERE user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);

$input = json_decode(file_get_contents('php://input'), true);
$userID = $input["user_id"];

$stmt->execute();
$result = $statement->get_result();
$inData = $result->fetch_all();

header('Content-type: application/json');

	$obj='[';
		$length=sizeof($inData);
		
		$i=0;
		while ($i<$length) {
			$object=$inData[$i];
			
			$obj=$obj.'{"contact_id": '.$object[0].', "last_name": "'.$object[1].'"'
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
echo $obj;

$stmt->close();
$conn->close();
