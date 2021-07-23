
<?php


$idNewCase = $_POST['idNewCase'];

$typeCase = $_POST['typeCase'];

$brandCase = $_POST['brandCase'];
    
$brandPhone = $_POST['brandPhone'];

$caseColor = $_POST['caseColor'];
   
$firstPriceCase = $_POST['firstPriceCase'];

$lastPriceCase = $_POST['lastPriceCase'];

$quantityNewCase = $_POST['quantityNewCase']; 

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
  echo("Товар з даним кодом уже зареєстрований на складі");
  die(); 
} else {
  $mysql->query("INSERT INTO `all_avaible_goods`(`type_good`,`good_content`,`color`,`cod`,`quantity`,`first_price`,`last_price`,`id_photo`)
    VALUES('чохол','$brandCase $typeCase $brandPhone','$caseColor','$idNewCase','$quantityNewCase','$firstPriceCase','$lastPriceCase','$fileName')");
}
}echo json_encode(["status" => true]);






