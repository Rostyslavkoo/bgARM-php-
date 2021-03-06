<?php 
session_start();
if(!$_SESSION['user']){
    header('Location: index.php');

}
?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>BigUpCase | Довання товару </title>
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
      <!-- <div class="toast" id="avaibleGoodToats" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; z-index: 100;">
         <div class="toast-header">
           <img src="assets/img/favicon/favicon-96x96.webp" class="rounded mr-2" alt="logo" style="width: 1rem; height: 1rem; margin-right:0.3rem;">
           <strong class="mr-auto">BigUpCase</strong>
           <small class="text-muted">11 mins ago</small>
           <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
         <i class="bi bi-x-lg"></i>
           </button>
         </div>
         <div class="toast-body">
           Ваші дані застарілі, оновіть сторінку
         </div>
         </div> -->
      <?php
         require"connect.php";
         ?>
      <div class="container-fluid mt-5">
         <header>
            <div class="row text-center d-flex align-items-center">
               <div class="col d-flex justify-content-center">
                  <div class="dropdown dropend ">
                     <button class="btn outline-none d-flex align-items-center menu" data-bs-toggle="dropdown"> <i class="bi bi-list"></i> </button>
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="main-add-good.php">Наявні товари</a></li>
                        <li><a class="dropdown-item" href="sold-good.php">Проданий товар</a></li>
                        <li><a class="dropdown-item" href="php-content/logout.php">Вийти</a></li>
                     </ul>
                  </div>
               </div>
               <div class="col">
                  <h1 class="text-secondary"> Наявні товари </h1>
               </div>
               <div class="col  text-secondary">
                  <!-- plus icon  --> <i class="bi bi-plus-square add" data-bs-toggle="modal" onclick="setTimeout(function(){ document.querySelector('#idAvaibleGood').focus(); }, 1000);" data-bs-target="#modal_add_avaible            "></i> 
               </div>
            </div>
         </header>
         <div class="container mt-5 mb-2 search">
            <div class="row d-flex justify-content-end">
               <div class="col-lg-2"> <input type="text" class="form-control"id="search" placeholder="Search..." onkeyup="tableSearch()"  placeholder="Пошук" autofocus> </div>
            </div>
         </div>
         <div class="container text-center">
            <div class="table-scrollable ">
               <table class="table table-hover" id="info-table">
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
                  <?php
                     require "connect.php";
                     
                     echo "<tbody id='avaibleGoodsTable'>";
                     
                     $query = "SELECT
                     `id`,
                     `type_good`,
                     `good_content`,
                     `color`,
                     `cod`,
                     `quantity`,
                     `first_price`,
                     `last_price`,
                     `id_photo`
                     FROM
                     `all_avaible_goods` WHERE `quantity` > 0
                     ORDER BY
                     id
                     DESC
                     ";
                     $i=0;
                     
                     //$numrows = mysqli_num_rows( $query);
                     if ($result = mysqli_query($mysql, $query)) {
                     
                       while ($row = mysqli_fetch_assoc($result)) { 
                           echo  '<tr>'.
                           '<th scope="row">'.$row["cod"].'</th>'.
                           '<td class="main-cell">'.$row["type_good"]. ' '.$row["good_content"].'</td>'.
                           '<td>'.$row["color"].'</td>'.
                           '<td>'.$row["quantity"].'шт</td>'.
                           '<td>'.$row["first_price"].'</td>'.
                           '<td>'.$row["last_price"].'</td>'.
                           '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop'.$row["id"].'"></i></td>'.
                           '<div class="modal fade" id="staticBackdrop'.$row["id"].'" aria-hidden="true">'.
                           '<div class="modal-dialog modal-dialog-centered modal-img-table">'.
                           '<div class="modal-content">'.
                           '<div class="modal-body">'.
                           '<img loading="lazy"src="uploads/'.$row["id_photo"].'" class="img-fluid" alt="">'.
                           '</div>'.
                           '</div>'.
                           '</div>'.
                           '</div>'.
                           '</tr> ';
                       }
                     
                     mysqli_free_result($result); // видалення
                     }
                     echo"</tbody>";
                     
                     
                     mysqli_close($mysql);
                     
                     ?>
               </table>
            </div>
         </div>
      </div>
      <!-- ALL MODALS -->
      <!-- Add-new-good-modal -->
      <div class="modal fade" id="modal_add_avaible" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div class="modal-content  c-modal-content ">
               <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Додати товар на склад</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <form action="php-content/add-avaible-good.php" method="post">
                  <div class="modal-body">
                     <!-- add-new-goods-btn -->
                     <div class="row justify-content-between align-items-center">
                        <div class="col col-lg-3 ">
                           <div class="form"> <input type="text" id="idAvaibleGood" name="idAvaibleGood" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="idAvaibleGood" class="form__label">Код товару</label> </div>
                        </div>
                        <div class="col col-lg-3"> <button type="button" onclick="show_cases()" class="btn btn-indigo-600 " id="btnNew" data-bs-toggle="modal" data-bs-target="#modal_add_new" data-bs-dismiss="modal"> <i class="bi bi-list"> </i> Новий </button> </div>
                     </div>
                     <div class="c-table-add-avaible table-responsive">
                        <table class="table"id="checkAvaibleTable">
                           <tbody>
                              <tr class=" align-items-center justify-content-between" id="dataCheckAvaibleInfo"style="display: flex">
                                 <td id="addAvaibleTxt"class="w-100 text-center">Введіть код товару</td>
                                 <td id="addAvaibleEmptyTxt"class="w-100 text-center"style="display:none">Такого товару не існує</td>
                                 <td id="addAvaibleSpin"class="w-100 text-center"style="display:none">
                                    <div class="spinner-grow m-1" style="width: 1rem; height:1rem;" role="status">
                                       <span class="sr-only"></span>
                                    </div>
                                    <div class="spinner-grow m-1" style="width: 1rem; height: 1rem;" role="status">
                                       <span class="sr-only"></span>
                                    </div>
                                    <div class="spinner-grow m-1" style="width: 1rem; height: 1rem;" role="status">
                                       <span class="sr-only"></span>
                                    </div>
                                 </td>
                              </tr>
                              <tr class=" align-items-center justify-content-between p-1" id="tmpCheckDataTable" style="display: none!important">
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div class="modal-footer ">
                     <div class="number-input"> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input class="quantity" id="quantityNewAvaibleGood"min="1" max="999" name="quantityAvaibleGood" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button type="button"onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus" type="text"><i class="bi bi-plus"></i> </button> </div>
                     <button id="addAvaibleBtn"type="button" class="btn btn-success upload-newgood-btn" onclick="uploadAvaibleGood()"disabled >  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="loaderAddAvaibleBtn" style="display: none;"></span>
                     Додати до складу</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
      <!-- Add-new-good-modal -->
      <div class="modal fade" id="modal_add_new" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
         <div class="modal-content c-modal-content">
            <div class="modal-header ">
               <h5 class="modal-title" id="staticBackdropLabel">Додати новий товар на склад</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <!-- add-new-goods-btn -->
               <div class="row add-new-goods-btn ">
                  <div class="col"> <button type="button" onclick="show_cases()" class="btn btn-gray-700 _active-btn" id="btnAddCase"> <i class="bi bi-list"></i> Чохли </button> </div>
                  <div class="col"> <button type="button" onclick="show_charge()" class="btn btn-gray-700 " id="btnAddCharge"> <i class="bi bi-list"></i> Зарядки </button> </div>
                  <div class="col "> <button type="button" onclick="show_glasse()" class="btn btn-gray-700 " id="btnAddGlass"> <i class="bi bi-list"></i> Скло </button> </div>
                  <div class="col "> <button type="button" onclick="show_another()" class="btn btn-gray-700 " id="btnAddAnother"> <i class="bi bi-list"></i> Інше </button> </div>
                  <div class="col gx-7 back">
                     <!-- back-2-add-avaible-goods --> <button type="button" class="btn btn-outline-red-400" onclick="            setTimeout(function(){ document.querySelector('#idAvaibleGood').focus(); }, 1000);            " data-bs-toggle="modal" data-bs-target="#modal_add_avaible" data-bs-dismiss="modal"> <i class="bi bi-box-arrow-left"></i> </button> 
                  </div>
               </div>
               <div class="container">
                  <!-- add new cases -->
                  <form id="uploadNewCaseForm" enctype="multipart/form-data">
                     <div class="row add_cases">
                        <div class="col">
                           <div class="form"> <input id="idNewCase" name="idNewCase" type="text" class="form__input form-control" required placeholder=" "> <label for="idNewCase" class="form__label">Код товару</label> </div>
                           <div class="form"> <input type="text" id="typeCase" name="typeCase" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="typeCase" class="form__label">Тип чохла</label> </div>
                           <div class="form"> <input type="text" id="brandCase" name="brandCase" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="brandCase" class="form__label">Бренд чохла</label> </div>
                        </div>
                        <div class="col">
                           <div class="form"> <input type="text" id="brandPhone" name="brandPhone" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="brandPhone" class="form__label">Марка телефона</label> </div>
                           <div class="form"> <input type="text" id="caseColor" name="caseColor" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="caseColor" class="form__label">Колір чохла</label> </div>
                           <div class="form"> <input type="text" id="firstPriceCase" onKeyPress="onlyNumber()" name="firstPriceCase" class="form__input form-control " required autocomplete="off" placeholder=" "> <label for="firstPriceCase" class="form__label">Ціна товару(шт)</label> </div>
                        </div>
                        <div class="row m-0">
                           <div class="drag-and-drop-add-case ">
                              <div class="drag-and-drop-content py-3" tabindex="0"> <label for="image"><i class="bi bi-file-earmark-plus d-flex justify-content-center  "></i></label> <input type="file" id="image" class='inputImages' name="image"  accept="image/png, image/jpeg" style="display:none"> </div>
                              <div class="drag-and-drop-img ">
                              </div>
                           </div>
                        </div>
                        <div class="modal-footer">
                           <div class="number-input"> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input id="quantityNewCase"class="quantity" min="1" max="999" name="quantityNewCase" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button type="button"onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"><i class="bi bi-plus"></i> </button> </div>
                           <div class="form w-75"> <input type="text" onKeyPress="onlyNumber()" id="lastPriceCase" name="lastPriceCase" class="form__input form-control "style="margin-top: 2px;" required autocomplete="off" placeholder=" "> <label for="lastPriceCase" class="form__label">Ціна продажу(шт)</label> </div>
                           <button id="uploadNewCaseBtn"type="submit" class="btn btn-success upload-newgood-btn-manual"  onclick="uploadImg()" disabled >  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="loaderNewcaseBTn" style="display: none;"></span>
                           Додати до складу</button>
                        </div>
                     </div>
                  </form>
                  <!-- add new charges -->
                  <form id="uploadNewChargeForm">
                     <div class="row  add_charges">
                        <div class="col">
                           <div class="form"> <input type="text" id="idNewCharge" name="idNewCharge" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="idNewCharge" class="form__label">Код товару</label> </div>
                           <div class="form"> <input type="text" id="typeCharge" name="typeCharge" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="typeCharge" class="form__label">Тип зарядки</label> </div>
                           <div class="form"> <input type="text" id="brandCharge" name="brandCharge" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="brandCharge" class="form__label">Бренд зардки</label> </div>
                        </div>
                        <div class="col">
                           <div class="form"> <input type="text" id="connector" name="connector" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="connector" class="form__label">Роз'єм</label> </div>
                           <div class="form"> <input type="text" id="colorCharge" name="colorCharge" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="colorCharge" class="form__label">Колір</label> </div>
                           <div class="form"> <input type="text" id="length" name="length" onKeyPress="onlyNumber()" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="length" class="form__label">Довжина(м)</label> </div>
                        </div>
                        <div class="row align-items-center justify-content-between  c-drag-and-drop-sm ">
                           <div class="col">
                              <div class="form "> <input type="text" onKeyPress="onlyNumber()" id="firstPriceCharge" name="firstPriceCharge" class="form__input form-control " required autocomplete="off" placeholder=" " style="width: 100%;"> <label for="firstPriceCharge" class="form__label ">Ціна товару(шт)</label> </div>
                           </div>
                           <div class="drag-and-drop-add-charge col d-flex">
                              <div class="drag-and-drop-content py-3 m-0" tabindex="0" id="drag-and-drop-charge"> <label for="new_charge_img"><i class="bi bi-file-earmark-plus d-flex justify-content-center  "></i></label> <input type="file"  class='inputImages' id="new_charge_img" name="new_charge_img" required accept="image/png, image/jpeg" style="display:none"> </div>
                           </div>
                        </div>
                        <div class="row drag-and-drop-img-charge">
                           <div class="drag-and-drop-img" id="drag-and-drop-img-charge">
                           </div>
                        </div>
                        <div class="modal-footer">
                           <div class="number-input"> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input id="quantityNewCharge"class="quantity" min="1" max="999" name="quantity" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus" type="text"><i class="bi bi-plus"></i> </button> </div>
                           <div class="form w-75"> <input type="text" id="lastPriceCharge" name="lastPriceCharge" class="form__input form-control "style="margin-top: 2px;" onKeyPress="onlyNumber()" required autocomplete="off" placeholder=" "> <label for="lastPriceCharge" class="form__label">Ціна продажу(шт)</label> </div>
                           <button type="submit" class="btn btn-success upload-newgood-btn-manual" disabled id="uploadNewChargesBtn"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="loaderNewChargeBtn" style="display: none;"></span>Додати до складу</button>
                        </div>
                     </div>
                  </form>
                  <form id="uploadNewGlassForm">
                  <div class="row add_glasses">
                     <div class="col ">
                        <div class="form"> <input type="text" id="idNewGlass" name="idNewGlass" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="idNewGlass" class="form__label">Код товару</label> </div>
                        <div class="form"> <input type="text" id="typeGlass" name="typeGlass" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="typeGlass" class="form__label">Тип Скла</label> </div>
                     </div>
                     <div class="col">
                        <div class="form"> <input type="text" id="brandPhoneGlass" name="brandPhoneGlass" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="brandPhoneGlass" class="form__label">Марка телефона</label> </div>
                        <div class="form"> <input type="text" id="colorGlass" name="colorGlass" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="colorGlass" class="form__label px-3">Колір</label> </div>
                     </div>
                     <div class="row align-items-center c-drag-and-drop-sm">
                        <div class="col">
                           <div class="form "> <input type="text" id="firstPriceGlass" name="firstPriceGlass" class="form__input form-control " required autocomplete="off" placeholder=" " onKeyPress="onlyNumber()" style="width:100%"> <label for="firstPriceGlass"  class="form__label ">Ціна товару(шт)</label> </div>
                        </div>
                        <div class="drag-and-drop-add-charge col ">
                           <div class="drag-and-drop-content py-3 m-0" tabindex="0"> <label for="new_glass_img"><i class="bi bi-file-earmark-plus d-flex justify-content-center  "></i></label> <input type="file" class='inputImages'id="new_glass_img" name="new_charge_img" required accept="image/png, image/jpeg" style="display:none"> </div>
                        </div>
                     </div>
                     <div class="row drag-and-drop-img-charge">
                        <div class="drag-and-drop-img">
                        </div>
                        <div class="modal-footer">
                           <div class="number-input"> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input class="quantity" id="quantityNewGlass"min="1" max="999" name="quantity" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus" type="text"><i class="bi bi-plus"></i> </button> </div>
                           <div class="form w-75"> <input onKeyPress="onlyNumber()" type="text" id="lastPriceGlass" name="lastPriceGlass" class="form__input form-control "style="margin-top: 2px;" required autocomplete="off" placeholder=" "> <label for="lastPriceGlass" class="form__label">Ціна продажу(шт)</label> </div>
                           <button type="submit" id="uploadNewGlassBtn"class="btn btn-success upload-newgood-btn-manual" disabled ><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="loaderNewGlassBtn" style="display: none;"></span>Додати до складу</button>
                        </div>
                    </div>
                     </div>
                 </form>        
                   <form id="uploadNewAnotherForm">
                  <div class="row add_another">
                     <div class="col ">
                        <div class="form"> <input type="text" id="idNewAnother" name="idNewAnother" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="idNewAnother" class="form__label">Код товару</label> </div>
                        <div class="form"> <input type="text" id="typeGoodAnother" name="typeGoodAnother" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="typeGoodAnother" class="form__label">Тип товару</label> </div>
                          <div class="form"> <input type="text" id="firstPriceAnother" onKeyPress="onlyNumber()" name="firstPriceAnother" class="form__input form-control " required autocomplete="off" placeholder=" "> <label for="firstPriceAnother" class="form__label">Ціна товару(шт)</label> </div>
                     </div>
                     <div class="col">
                        <div class="form-desc"> <textarea type="text" id="describeAnotherGood" name="describeAnotherGood" class="form__input form-control" required autocomplete="off" placeholder=" "></textarea> <label for="describeAnotherGood" class="form__label">Опис товару</label> </div>
                        <div class="form"> <input type="text" id="colorAnother" name="colorAnother" class="form__input form-control" required autocomplete="off" placeholder=" "> <label for="colorAnother" class="form__label px-3">Колір</label> </div>
                     </div>
                

                        <div class="row m-0">
                           <div class="drag-and-drop-add-case ">
                              <div class="drag-and-drop-content py-3" tabindex="0"> <label for="image"><i class="bi bi-file-earmark-plus d-flex justify-content-center  "></i></label> <input type="file" id="new-image-another" class='inputImages' name="image"  accept="image/png, image/jpeg" style="display:none"> </div>
                              <div class="drag-and-drop-img ">
                              </div>
                           </div>
                        </div>
                        <div class="modal-footer">
                           <div class="number-input"> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="bi bi-dash"></i></button> <input class="quantity" id="quantityNewAnother"min="1" max="999" name="quantity" value="1" type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" required> <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus" type="text"><i class="bi bi-plus"></i> </button> </div>
                           <div class="form w-75"> <input onKeyPress="onlyNumber()" type="text" id="lastPriceAnother" name="lastPriceAnother" class="form__input form-control "style="margin-top: 2px;" required autocomplete="off" placeholder=" "> <label for="lastPriceAnother" class="form__label">Ціна продажу(шт)</label> </div>
                           <button type="submit" id="uploadNewAnotherBtn"class="btn btn-success upload-newgood-btn-manual" disabled ><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="loaderNewAnotherBtn" style="display: none;"></span>Додати до складу</button>
                        </div>
                    </div>
                 </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- bootstrap link js  -->
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>   

      <script src="assets/js/main.js" charset="utf-8"></script>
      <script src="assets/js/search-table.js" charset="utf-8"></script>
      <script src="assets/js/drag-and-drop.js" charset="utf-8"></script>
      <script src="assets/js/upload-charges.js" charset="utf-8"></script>
      <script src="assets/js/upload-cases.js" charset="utf-8"></script>
      <script src="assets/js/upload-glasses.js" charset="utf-8"></script>
      <script src="assets/js/validate-input.js" charset="utf-8"></script>
      <script src="assets/js/upload-new-goods.js" charset="utf-8"></script>
      <script src="assets/js/upload-another.js" charset="utf-8"></script>
      <script src="assets/js/toasts.js" charset="utf-8"></script>
 <?php 
 // if
 //      echo '<script>
 //      let date = Date().slice(16, 21);
 //      createToast("Bigupcase", date,"'.$_SESSION['message'].' ")
 //   </script>'
      ?>
   </body>
</html>