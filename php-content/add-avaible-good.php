<?php 
$idAvaibleGood = filter_var($_POST['idAvaibleGood'],
    FILTER_SANITIZE_STRING );
    $idAvaibleGood = mb_strtolower($idAvaibleGood);
    $quantityAvaibleGood = filter_var($_POST['quantityAvaibleGood'],
    FILTER_SANITIZE_STRING );
    $quantityAvaibleGood = mb_strtolower($quantityAvaibleGood);
    

   require"../connect.php";

  $mysql->query("UPDATE `all_avaible_goods` SET `quantity` = `quantity` + '$quantityAvaibleGood' WHERE `cod` = '$idAvaibleGood' "); 
  //  вношу дані в таблицю 'all_avaible_goods'

header("Location:../main-add-good.php");
?>