<?php

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

$quantityNewCase = filter_var($_POST['quantityNewCase'],
    FILTER_SANITIZE_STRING );
    $quantityNewCase = mb_strtolower($quantityNewCase);


$mysql = new mysqli('localhost', 'root', 'root','bgARM');
@mysqli_set_charset($mysql, 'utf8');


  $mysql->query("INSERT INTO `all_avaible_goods`(`type_good`,`case_type`,`case_brand`,`phone_brand`,`color`,`cod`,`first_price`)
  VALUES('чохол','$typeCase','$brandCase','$brandPhone','$caseColor','$idNewCase','$firstPriceCase')"); //  вношу дані в таблицю 'all_avaible_goods'


  // $mysql->query("INSERT INTO `all_goods`(`type_good`,`case_type`,`case_brand`,`phone_brand`,`phone_model`,`color`,`cod`,`date`,`first_price`)
  // VALUES('$type_good','$case_type','$case_brand','$phone_brand','$phone_model','$color','$cod', '$date','$first_price')"); //  вношу дані в таблицю 'all_goods'

        // if(isset($_POST['s_cod'])){
        //   require "connect.php";
        //   $scod = mysqli_real_escape_string($mysql, $_POST['s_cod']);
        //
        //   $query ="DELETE FROM `avaible` WHERE `s_cod`  LIKE '$scod' "; // видаляю товар, `s_cod` якого введено у форму
        //   $result = mysqli_query($mysql, $query) or die("Помилка " . mysqli_error($mysql));
//
//   mysqli_close($mysql);
// }

header("Location:../main-add-good.php");

