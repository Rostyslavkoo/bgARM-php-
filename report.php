<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.min.css">
    <title>Звіт</title>
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
    <div class="container-lg mt-5">
        <div class="row justify-content-end border-bottom mb-4 h5 p-2 align-items-center">
            <div class="col col-lg-11">Накладна магазину «BigUpCase» за червень 2021р.</div>
            <div class="col col-lg-1"> <button type="button" onclick="window.print()" class="btn btn-sm btn-secondary print-ico"> <i class="bi bi-printer "></i> </button> </div>
        </div>
        <table class="table table-sm table-bordered report-table">
            <caption>
                <p>Всього найменувань 3, на суму 5 000 UAH</p>
                <p><b>п'ять тисячь гривень</b></p>
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
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>НФ-12431</td>
                    <td>Задній бампер Silicone 1:1 Iphone 7/8 Чорний</td>
                    <td>10</td>
                    <td>1000</td>
                    <td>450</td>
                </tr>
            </tbody>
            <tfoot class="table-light">
                <tr>
                    <th scope="row" colspan="4">Підсумок</th>
                    <th>5 000</th>
                    <th>2 3400</th>
                </tr>
            </tfoot>
        </table>
    </div>
</body>

</html>