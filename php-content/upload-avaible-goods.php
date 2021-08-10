<?php 
$request = file_get_contents("php://input"); // gets the raw data
$params = json_decode($request,true); // true for return as array
$idNewGood = $params['avaibleGoodCod'];
$idNewGood = htmlspecialchars($idNewGood,ENT_QUOTES);

$quantityNewAvaibleGood = $params['quantityNewAvaibleGood'];
$quantityNewAvaibleGood = htmlspecialchars($quantityNewAvaibleGood,ENT_QUOTES);

   require"../connect.php";

  $mysql->query("UPDATE `all_avaible_goods` SET `quantity` = `quantity` + '$quantityNewAvaibleGood' WHERE `cod` = '$idNewGood' "); 

 $output = "SELECT * FROM `all_avaible_goods` WHERE `cod` = '$idNewGood'";

$result = mysqli_query($mysql, $output);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
  	$idGood = $row["id"];
  	$type_good = $row["type_good"];
  	$good_content = $row["good_content"];
  	$color = $row["color"];
  	$cod = $row["cod"];
  	$quantity = $row["quantity"];
  	$first_price = $row["first_price"];
  	$last_price = $row["last_price"];
  	$id_photo = $row["id_photo"];
    $return_arr[] = array("idGood" => "$idGood",
                    "type_good" => "$type_good",
                    "good_content" => "$good_content",
                    "color" => "$color",
                    "cod" => "$cod",
                    "cod" => "$cod",
                    "cod" => "$cod",
                    "quantity" => "$quantity",
                    "first_price" => "$first_price",
                    "last_price" => "$last_price",
                    "id_photo" => "$id_photo",
                 );
	}
}

// mysqli_close($mysql);
echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);


?>