
<?php


$idNewCase = $_POST['idNewCase'];
$idNewCase = htmlspecialchars($idNewCase,ENT_QUOTES);

$typeCase = $_POST['typeCase'];
$typeCase = htmlspecialchars($typeCase,ENT_QUOTES);

$brandCase = $_POST['brandCase'];
$brandCase = htmlspecialchars($brandCase,ENT_QUOTES);

$brandPhone = $_POST['brandPhone'];
$brandPhone = htmlspecialchars($brandPhone,ENT_QUOTES);

$caseColor = $_POST['caseColor'];
   $caseColor = htmlspecialchars($caseColor,ENT_QUOTES);

$firstPriceCase = $_POST['firstPriceCase'];
$firstPriceCase = htmlspecialchars($firstPriceCase,ENT_QUOTES);

$lastPriceCase = $_POST['lastPriceCase'];
$lastPriceCase = htmlspecialchars($lastPriceCase,ENT_QUOTES);

$quantityNewCase = $_POST['quantityNewCase']; 
$quantityNewCase = htmlspecialchars($quantityNewCase,ENT_QUOTES);

$images = $_FILES;

$types = ["image/jpeg", "image/png", "image/webp"];

foreach ($images as $image) {

// ищем в массиве с типами тип текущего файла
if (!in_array($image["type"], $types)) {
    die('Incorrect file type');
}

// определяем размер файла в мегабайтах
$fileSize = $image["size"] / 1000000;
// максимальный размер файла в мегабайтах
$maxSize = 5;

// проверяем, чтобы размер файла не превышал ограничение
if ($fileSize > $maxSize) {
    die('Incorrect file size');
}

// создаем папку uploads в корне проекта, если её нет
if (!is_dir('../uploads')) {
    mkdir('../uploads', 0777, true);
}

// изнаем расширение текущего файла
$extension = pathinfo($image["name"], PATHINFO_EXTENSION);
// формируем уникальное имя с помощью функции time()
$fileName = time() . ".$extension";

// загружаем файл и проверяем
// если во премя загрузки файла произошла ошибка, возвращаем die()

    if (move_uploaded_file($image["tmp_name"], "../uploads/" . $fileName)) {
        // die('Error upload file');
    $compressFile = "../uploads/" . $fileName;
  
 
    }
    function img_compress($img)
    {
        $imagickSrc = new Imagick($img);
        $compresionList = [Imagick::COMPRESSION_JPEG2000];

        $imagickDst = new Imagick();
        $imagickDst->setCompression(80);
        $imagickDst->setCompressionQuality(80);
        $imagickDst->newPseudoImage(
            $imagickSrc->getImageWidth(),
            $imagickSrc->getImageHeight(),
            'canvas:white'
        );
        $imagickDst->compositeImage(
            $imagickSrc,
            Imagick::COMPOSITE_ATOP,
            0,
            0
        );
        $imagickDst->setImageFormat('jpg');
        $imagickDst->writeImage($img);
;
    };

     img_compress($compressFile);
              require"../connect.php";

$res = $mysql->query("SELECT `cod` FROM `all_avaible_goods` WHERE `cod` = '$idNewCase'");
$count = mysqli_num_rows($res);
if( $count > 0 ) {
  echo json_encode(["avaible" => true]);
  die(); 
} else {
  $mysql->query("INSERT INTO `all_avaible_goods`(`type_good`,`good_content`,`color`,`cod`,`quantity`,`first_price`,`last_price`,`id_photo`)
    VALUES('чохол','$brandCase $typeCase $brandPhone','$caseColor','$idNewCase','$quantityNewCase','$firstPriceCase','$lastPriceCase','$fileName')");
}

 $output = "SELECT * FROM `all_avaible_goods` WHERE `cod` = '$idNewCase'";

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
    if($return_arr){
    echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);

}
}
else{
      echo json_encode(["status" => false]);

}
}





