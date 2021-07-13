<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BuC | Проданий товар </title>
    <link rel="stylesheet" href="assets/css/style.min.css">
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
    <div class="container-fluid mt-5">
        <header>
            <div class="row text-center d-flex align-items-center">
                <div class="col d-flex justify-content-center">
                    <div class="dropdown dropend "> <button class="btn outline-none d-flex align-items-center menu" data-bs-toggle="dropdown"> <i class="bi bi-list"></i> </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="main-add-good.php">Наявні товари</a></li>
                            <li><a class="dropdown-item" href="sold-good.php">Проданий товар</a></li>
                            <li><a class="dropdown-item" href="index.php">Вийти</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col">
                    <h1 class="text-secondary"> Продані товари </h1>
                </div>
                <div class="col  text-secondary">
                    <!-- plus icon  --> <i class="bi bi-plus-square add" data-bs-toggle="modal" onclick="setTimeout(function(){ document.querySelector('#idSoldGood').focus(); }, 1000);" data-bs-target="#modal_add_avaible"></i> </div>
            </div>
        </header>
        <div class="container mt-5 mb-2 search">
            <div class="row d-flex justify-content-end">
                <div class="col-lg-3 d-flex search"> <input type="text" class="form-control" placeholder="Пошук" autofocus> <button type="button" class=" mx-1 btn btn-secondary report-btn" data-bs-toggle="modal" data-bs-target="#setPeriodTimeToReport"> Звіт </button> </div>
            </div>
        </div>.
        <div class="container ">
            <div class="table-scrollable ">
                <table class="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">№</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип назва та модель"> Тип товару</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір товару">Колір</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість товарву (шт.)">К..сть</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Закупівельна ціна(грн)">Зак..ціна</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу (грн)">Про..ціна</span> </th>
                            <th scope="col"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Фото товарy">Фото</span> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">НФ-12431</th>
                            <td class="main-cell">Iphone 7/8 Silicone Case</td>
                            <td>Black</td>
                            <td>10</td>
                            <td>50</td>
                            <td>150</td>
                            <td class="b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></td>
                            <div class="modal fade" id="staticBackdrop" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-img-table">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <picture>
                                                <source srcset="assets/img/test-case.webp" type="image/webp"><img src="assets/img/test-case.jpeg" class="img-fluid" alt=""></picture>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div> <!-- INCLUDE MODALS -->
    <!-- Add-new-good-modal -->
    <div class="modal fade" id="modal_add_avaible" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content  c-modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Додати товар на склад</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- add-new-goods-btn -->
                    <form action="">
                        <div class="row  justify-content-between align-items-center">
                            <div class="col col-lg-3 ">
                                <div class="form"> <input type="text" id="idSoldGood" name="idSoldGood" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="idSoldGood" class="form__label">Код товару</label> </div>
                            </div>
                        </div>
                        <div class="c-table-add-avaible table-responsive">
                            <table class="table">
                                <tbody>
                                    <tr class="d-flex align-items-center justify-content-between">
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">НФ-12431</span> </td>
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип та назва товару">Задній бампер Silicone 1:1 Iphone 7/8</span> </td>
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір">Чорний</span> </td>
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість">10</span> </td>
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Початкова ціна">50</span> </td>
                                        <td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу">100</span> </td>
                                        <td class="c-img-table">
                                            <picture>
                                                <source srcset="assets/img/test-case.webp" type="image/webp"><img src="assets/img/test-case.jpeg" alt="image"></picture>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row modal_input justify-content-around ">
                            <div class="col  col-lg-4 form "> <input type="datetime-local" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="email" class="form__label">Дата продажу</label> </div>
                            <div class="col col-lg-4 modal-input-block">
                                <div class="form"> <input type="text" id="lastPriceGood" name="lastPriceGood" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="lastPriceGood" class="form__label px-3">Ціна товару(шт)</label> </div>
                            </div>
                        </div>
                        <div class="modal-footer ">
                            <div class="number-input"> <button type="reset" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input class="quantity" min="1" max="999" name="quantity" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus" type="text"><i class="bi bi-plus"></i> </button> </div> <button type="submit" class="btn btn-success">Додати до складу</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <form action="report.php" method="GET" target="_blank">
        <div class="modal fade " id="setPeriodTimeToReport" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content c-modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Вибір періоду проданих товарів</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body  ">
                        <div class="container d-flex justify-content-between c-time-perioud">
                            <div class="col col-lg-5 form "> <input type="datetime-local" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="email" class="form__label">Початкова дата</label> </div>
                            <div class="col col col-lg-5 form"> <input type="datetime-local" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="email" class="form__label">Кінцева дата</label> </div>
                        </div>
                        <div class="modal-footer"> <button type="submit" class="btn btn-gray-700">Створити звіт</button> </div>
                    </div>
                </div>
            </div>
        </div>
    </form> <!-- bootstrap link js  -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
    <script src="assets/js/main.min.js" charset="utf-8"></script>
</body>

</html>