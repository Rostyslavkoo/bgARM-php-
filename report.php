<?php 

session_start();

if(!$_SESSION['user']){
    header('Location: index.php');

}?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.min.css">
    <title>Звіт <?php 
        require('php-content/convert-number.php');


$firstDate = $_GET['firstSearchDate'];
$secondDate = $_GET['secondSearchDate'];

$year= date("Y", strtotime($secondDate));
    $mountTimeStamp = strtotime($secondDate);
$mounth =$month_uk[date("m",$mountTimeStamp)];
echo $mounth.' '.$year?></title>
    <link rel="stylesheet" href="assets/css/style.min.css">
    <link rel="apple-touch-icon" sizes="57x57" href="assets/img/favicon/apple-icon-57x57.webp">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/img/favicon/apple-icon-60x60.webp">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/img/favicon/apple-icon-72x72.webp">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/favicon/apple-icon-76x76.webp">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/img/favicon/apple-icon-114x114.webp">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/img/favicon/apple-icon-120x120.webp">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/img/favicon/apple-icon-144x144.webp">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/img/favicon/apple-icon-152x152.webp">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicon/apple-icon-180x180.webp">
    <link rel="icon" type="image/webp" sizes="192x192" href="assets/img/favicon/android-icon-192x192.webp">
    <link rel="icon" type="image/webp" sizes="32x32" href="assets/img/favicon/favicon-32x32.webp">
    <link rel="icon" type="image/webp" sizes="96x96" href="assets/img/favicon/favicon-96x96.webp">
    <link rel="icon" type="image/webp" sizes="16x16" href="assets/img/favicon/favicon-16x16.webp">
    <link rel="manifest" href="assets/img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/img/favicon/ms-icon-144x144.webp">
    <meta name="theme-color" content="#ffffff">

</head>

<body>
    <?php 

require('connect.php');
$fixGroupBy ="SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''))";
    $returnsOutput = " SELECT `sold_date`, SUM( `last_price` * `quantity`) AS 'returnSum' FROM `sold_goods` WHERE sold_date BETWEEN'$firstDate' AND '$secondDate'";

$resultReturns = mysqli_query($mysql, $fixGroupBy)or die(mysqli_error($mysql));
$resultReturns = mysqli_query($mysql, $returnsOutput)or die(mysqli_error($mysql));

if(mysqli_num_rows($resultReturns) > 0) {
 while($row = mysqli_fetch_assoc($resultReturns)) {
    $ReturnsSum = $row["returnSum"];
 }
}else{
 $ReturnsSum = 'Помилка';
 
}
$sumnINword =  sum2words($ReturnsSum);

$incomeOutput = "SELECT `sold_date`,`sold`, SUM( (`last_price` - `first_price`) * `quantity`) AS 'incomeSum' FROM `sold_goods` WHERE sold_date BETWEEN'$firstDate' AND '$secondDate' ";
$resultReturns = mysqli_query($mysql, $fixGroupBy)or die(mysqli_error($mysql));

$resultIncome = mysqli_query($mysql, $incomeOutput)or die(mysqli_error($mysql));

if(mysqli_num_rows($resultIncome) > 0) {
 while($row = mysqli_fetch_assoc($resultIncome)) {
    $incomeSum = $row["incomeSum"];
 }
}else{
 $incomeSum = 'Помилка';
 
}

$search = "SELECT * FROM `sold_goods` WHERE sold_date BETWEEN  '$firstDate' AND '$secondDate' ";

$resultSearch = mysqli_query($mysql, $search)or die(mysqli_error($mysql));
if(mysqli_num_rows($resultSearch) > 0) {


     echo ' <div class="container-lg mt-5">
        <div class="row justify-content-end border-bottom mb-4 h5 p-2 align-items-center">
            <div class="col col-lg-11">Накладна магазину «BigUpCase» за '.$mounth.' '.$year.'.</div>
            <div class="col col-lg-1"> <button type="button" onclick="window.print()" class="btn btn-sm btn-secondary print-ico"> <i class="bi bi-printer "></i> </button> </div>
        </div>
        <table class="table table-sm table-bordered report-table">
            <caption>
                <p>Всього найменувань '.mysqli_num_rows($resultSearch).', на суму '.$ReturnsSum.' UAH</p>
                <p><b>'.$sumnINword.'</b></p>
            </caption>
            <thead class="table-light">
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Код</th>
                    <th scope="col">Тип товару</th>
                    <th scope="col">Кількість</th>
                    <th scope="col">Ціна</th>
                    <th scope="col">Дохід</th>
                </tr>
            </thead>
            <tbody>';

$i = 1;
    while($row = mysqli_fetch_assoc($resultSearch)) {
    $idGood = $row["id"];
    $type_good = $row["type_good"];
    $good_content = $row["good_content"];
    $color = $row["color"];
    $cod = $row["cod"];
    $quantity = $row["quantity"];
    $first_price = $row["first_price"];
    $last_price = $row["last_price"] ;
    $last_price = $row["last_price"];
    $id_photo = $row["id_photo"];
     echo '<tr>
                    <th scope="row">'.$i++. '</th>
                    <td>'.$cod.'</td>
                    <td>'.$good_content .' '.$color.'</td>
                    <td>'.$quantity.'</td>
                    <td>'.$last_price * $quantity. '</td>
                    <td>'.($last_price - $first_price)*$quantity.'</td>
                  
                </tr>';

    }
               
            echo '</tbody>
            <tfoot class="table-light">
                <tr>
                    <th scope="row" colspan="4">Підсумок</th>


                    <th>'.$ReturnsSum.'</th>
                  <th>'.$incomeSum.'</th>
                </tr>
            </tfoot>
        </table>';



}else{
  echo 'Нічого не знайдено.';

}
  
            ?>
    </div>

</body>

</html>