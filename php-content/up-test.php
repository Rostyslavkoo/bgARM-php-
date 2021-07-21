<pre>
	<?php print_r($_FILES)
?>
</pre>
<?php 

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

    if (!move_uploaded_file($image["tmp_name"], "../uploads/" . $fileName)) {
        die('Error upload file');
    }
}


$idNewCase = filter_var($_POST['idNewCase'],
    FILTER_SANITIZE_STRING );
    $idNewCase = mb_strtolower($idNewCase);

$typeCase = filter_var($_POST['typeCase'],
    FILTER_SANITIZE_STRING );
    $typeCase = mb_strtolower($typeCase);

$brandCase = filter_var($_POST['brandCase'],
    FILTER_SANITIZE_STRING );
    $brandCase = mb_strtolower($brandCase);

$brandPhone = filter_var($_POST['brandPhone'],
    FILTER_SANITIZE_STRING );
    $brandPhone = mb_strtolower($brandPhone);

$caseColor = filter_var($_POST['caseColor'],
    FILTER_SANITIZE_STRING );
    $caseColor = mb_strtolower($caseColor);

$firstPriceCase = filter_var($_POST['firstPriceCase'],
    FILTER_SANITIZE_STRING );
    $firstPriceCase = mb_strtolower($firstPriceCase);

$lastPriceCase = filter_var($_POST['lastPriceCase'],
    FILTER_SANITIZE_STRING );
    $lastPriceCase = mb_strtolower($lastPriceCase);

$quantityNewCase = filter_var($_POST['quantityNewCase'],
    FILTER_SANITIZE_STRING );
    $quantityNewCase = mb_strtolower($quantityNewCase);

    require"../connect.php";

    $mysql->query("INSERT INTO `all_avaible_goods`(`type_good`,`good_content`,`color`,`cod`,`quantity`,`first_price`,`last_price`,`id_photo`)
    VALUES('чохол','$brandCase $typeCase $brandPhone','$caseColor','$idNewCase','$quantityNewCase','$firstPriceCase','$lastPriceCase','$fileName')"); //  вношу дані в таблицю 'all_avaible_goods'
    echo $idNewCase;
	exit();
echo json_encode(["status" => true]);
    header("Location:../main-add-good.php");
