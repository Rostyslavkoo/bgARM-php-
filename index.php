<?php
session_start();
if(@$_SESSION['user']){
    header('Location: main-add-good.php');

}
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BuC | Вхід</title>
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
<div id="toast-container" class="toast-container position-fixed top-0 start-0 p-1" style="z-index: 1100;"> </div>
    <form action="php-content/autorise.php" method="POST" name="login-form">
        <div class="container d-grid align-items-center" style="height: 100vh;">
            <div class="row align-items-center  justify-content-center w-auto">
                <div class="login-input col col-lg-3">
                    <div class="form p-0 m-0"> <input id="AccesCod" type="password" class="form__input form-control "name='autoriseCod' required autocomplete="off" placeholder=" " autofocus> <label for="AccesCod" class="form__label ">Код доступу</label> </div>

<div class="text-left position-absolute"> <p id="wrong-pass-text"></p></div>


                </div>
                <div class="w-auto"> <button s class="btn btn-gray-700 p-2 mb-1 autoriseBtn" type="submit" ><span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true" id="loaderAutoriseBtn" style="display:none"></span>Вхід</button> </div>
            </div>
        </div>
    </form>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="assets/js/autorise.js" charset="utf-8"></script>
      <script src="assets/js/toasts.js" charset="utf-8"></script>


</body>

</html>