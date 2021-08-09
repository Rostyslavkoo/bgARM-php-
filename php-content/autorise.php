<?php 
session_start();
require('../connect.php');


$autoriseCod = md5($_POST["autoriseCod"]);

$checkUpload = "SELECT * FROM `users` WHERE `password` = '$autoriseCod'";

$result = mysqli_query($mysql, $checkUpload);
if(mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_assoc($result)) {
$id = $row['id'];
$_SESSION['user'] = [
	"id" => $id
];
	echo json_encode(["status" => true]);

}
}
else{
echo json_encode(["status" => false]);
}




