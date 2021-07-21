<?php

$idNewCharge = $_POST['idNewChargeValue'];

$typeCharge = $_POST['typeCharge'];

$brandCharge = $_POST['brandCharge'];

$connector = $_POST['connector'];

$length = $_POST['length'] .'м';

$colorCharge = $_POST['colorCharge'];

$firstPriceCharge = $_POST['firstPriceCharge'];

$quantityNewCharge = $_POST['quantityNewCharge'];

$lastPriceCharge = $_POST['lastPriceCharge'];

echo $idNewCharge;
    require"../connect.php";

    $mysql->query("INSERT INTO `all_avaible_goods`(`type_good`,`good_content`,`color`,`cod`,`quantity`,`first_price`,`last_price`,`id_photo`)
    VALUES('зарядка','$brandCharge $connector $typeCharge $length ','$colorCharge','$idNewCharge','$quantityNewCharge','$firstPriceCharge','$lastPriceCharge','test')");