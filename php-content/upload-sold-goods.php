<?php 
$request = file_get_contents("php://input"); // gets the raw data
$params = json_decode($request,true); // true for return as array
$soldGoodCod = $params['soldGoodCod'];    
$soldGoodCod = htmlspecialchars($soldGoodCod,ENT_QUOTES);

$quantitySoldGood = $params['quantitySoldGood'];
$quantitySoldGood = htmlspecialchars($quantitySoldGood,ENT_QUOTES);

$SoldGoodDate = $params['SoldGoodDate'];
$SoldGoodDate = htmlspecialchars($SoldGoodDate,ENT_QUOTES);

$lastPriceSoldGood = $params['lastPriceSoldGood'];
$lastPriceSoldGood = htmlspecialchars($lastPriceSoldGood,ENT_QUOTES);

   require"../connect.php";
  // $mysql->query("UPDATE `all_avaible_goods` SET `quantity` = `quantity` + '$quantityNewAvaibleGood' WHERE `cod` = '$soldGoodCod' "); 

 $avaibleGoodCodOutput = "SELECT `quantity` FROM `all_avaible_goods` WHERE `cod` = '$soldGoodCod'";

 $result = mysqli_query($mysql, $avaibleGoodCodOutput);

 if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
  	$avaibleGoodCod = $row["quantity"];
	}
}

 $diff = $avaibleGoodCod - $quantitySoldGood;
if($diff <0){
   echo json_encode(["quantity" => false]);
   die();
}

$DataFromAvaibleTable = "SELECT * FROM `all_avaible_goods` WHERE `cod` LIKE '$soldGoodCod'";


 $output = "SELECT * FROM `all_avaible_goods` WHERE `cod` = '$soldGoodCod'";

$result = mysqli_query($mysql, $output);

if (mysqli_num_rows($result) > 0) {
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

	}
}

 $checkAlredySoldGood = "SELECT * FROM `sold_goods` WHERE `cod` = '$soldGoodCod' and `last_price` ='$lastPriceSoldGood' and `sold_date` = '$SoldGoodDate'";

$resultCheckSold = mysqli_query($mysql, $checkAlredySoldGood);

if (mysqli_num_rows($resultCheckSold) > 0) {

  $mysql->query("UPDATE
    `sold_goods`
SET
    `quantity` = `quantity` + '$quantitySoldGood'
WHERE
    `cod` = '$soldGoodCod'and `last_price` ='$lastPriceSoldGood' and `sold_date` = '$SoldGoodDate'"); 
   echo json_encode(["quantity" => true]);
}else{
	$insertSoldtable = "INSERT INTO `sold_goods`(
    `type_good`,
    `good_content`,
    `color`,
    `cod`,
    `quantity`,
    `first_price`,
    `last_price`,
     `sold_date`,
    `id_photo`)
VALUES(
    '$type_good',
    '$good_content',
    '$color',
    '$cod',
    '$quantitySoldGood',
    '$first_price',
    '$lastPriceSoldGood',
    '$SoldGoodDate',
    '$id_photo')";  


    $InsertResult = mysqli_query($mysql, $insertSoldtable);

$result = mysqli_query($mysql, $output);

 $soldOutputdata = "SELECT * FROM `sold_goods` WHERE `cod` = '$soldGoodCod'and `last_price` ='$lastPriceSoldGood' and `sold_date` = '$SoldGoodDate' ";

$resultOutput = mysqli_query($mysql, $soldOutputdata);

if (mysqli_num_rows($resultOutput) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($resultOutput)) {
  	$idGood = $row["id"];
  	$type_good = $row["type_good"];
  	$good_content = $row["good_content"];
  	$color = $row["color"];
  	$cod = $row["cod"];
  	$quantity = $row["quantity"];
  	$first_price = $row["first_price"];
  	$last_price = $row["last_price"];
  	$soldDateGood = $row["sold_date"];
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
                    "soldDate" => "$soldDateGood",
                    "id_photo" => "$id_photo",
                 );
	}
}

// mysqli_close($mysql);
echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}

  $mysql->query("UPDATE
    `all_avaible_goods`
SET
    `quantity` = `quantity` - '$quantitySoldGood'
WHERE
    `cod` = '$soldGoodCod'"); 


?>