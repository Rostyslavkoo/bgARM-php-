<?php 
$return_arr = array();
// $idNewGood = $_POST['avaibleGoodCod'];
// $idNewGood = json_decode($_POST["avaibleGoodCod"], true);
// echo(json_decode($_POST).true);
// var_dump($_POST);
$request = file_get_contents("php://input"); // gets the raw data
$params = json_decode($request,true); // true for return as array
$idNewGood = $params['avaibleGoodCod'];

              require"../connect.php";

$checkAvaible = $mysql->query("SELECT `cod` FROM `all_avaible_goods` WHERE `cod` = '$idNewGood'");
$count = mysqli_num_rows($checkAvaible);

if($count == 0 ) {
  echo json_encode(["avaible" => false]);
  die(); 
}

//  $checkAlredySoldGood = "SELECT `quantity` FROM `all_avaible_goods` WHERE `cod` = '$idNewGood'";
// $resultCheckSold = mysqli_query($mysql, $checkAlredySoldGood);

//    if (mysqli_num_rows($resultCheckSold) > 0) {
//   // output data of each row
//   while($row = mysqli_fetch_assoc($resultCheckSold)) {
//     $checkQuantity = $row["quantity"];
//   }
// }

// if (!$checkQuantity > 0 ) {
//    echo json_encode(["avaibleQuantity" => false]);
// }
  // echo json_encode(["avaible" => true]);
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
    // echo 
    // '<br>id:' .$idGood.
    // '<br>type_good:' .$type_good.
    // '<br>good_content: ' .$good_content.
    // '<br>color:' .$color.
    // '<br>quantity:' .$quantity.
    // '<br>first_price:' .$first_price.
    // '<br>id_photo:' .$id_photo;
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