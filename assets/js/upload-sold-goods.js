let inputSoldCod = document.getElementById('idSoldGood')
let addSoldBtn = document.getElementById('addSoldBtn')
let addAvaibleTxtToSold = document.getElementById('addAvaibleTxtToSold')
let addAvaibleEmptyTxtToSold = document.getElementById('addAvaibleEmptyTxtToSold')
let addAvaibleSpinToSold = document.getElementById('addAvaibleSpinToSold')
let dataCheckAvaibleInfoToSold = document.getElementById('dataCheckAvaibleInfoToSold')
let tmpCheckDataTableToSold = document.getElementById('tmpCheckDataTableToSold')
let loaderAddSoldBtn = document.getElementById('loaderAddSoldBtn')
let setSoldGoodDate = document.getElementById('setSoldGoodDate')
let lastPriceSoldGood = document.getElementById('lastPriceSoldGood')
let quantitySoldGood = document.getElementById('quantitySoldGood')
let soldGoodform = document.getElementById('quantitySoldGood')
// let quantityNewAvaibleGood = document.getElementById('quantityNewAvaibleGood')
function tool_tip() {
    $('[data-bs-toggle="tooltip"]').tooltip()
}
addSoldBtn.addEventListener("click", function(e) {
    e.preventDefault();
})
inputSoldCod.onkeyup = function() {
    // addAvaibleSpin.style.display = '';
    addAvaibleTxtToSold.style.display = 'none';
    addAvaibleEmptyTxtToSold.style.display = 'none'
    if (inputSoldCod.value == ``) {
        tmpCheckDataTableToSold.style.setProperty("display", "none", "important")

        dataCheckAvaibleInfoToSold.style.display = 'flex'
        addSoldBtn.setAttribute("disabled", true);
        addAvaibleTxtToSold.style.display = '';
        addAvaibleSpinToSold.style.display = 'none';
        addAvaibleEmptyTxtToSold.style.display = 'none';
    } else {

        $.ajax({
            url: 'php-content/check-avaible-goods.php',
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                avaibleGoodCod: inputSoldCod.value



            }),
            beforeSend: function() {
                addAvaibleSpinToSold.style.display = '';
                dataCheckAvaibleInfoToSold.style.display = 'flex'
                tmpCheckDataTableToSold.style.setProperty("display", "none", "important")

            },

            success: function(response) {
                if (response.avaible == false) {
                    console.log(response)
                    addAvaibleEmptyTxtToSold.style.display = ''
                    addAvaibleSpinToSold.style.display = 'none';

                    tmpCheckDataTableToSold.style.setProperty("display", "none", "important")
                    dataCheckAvaibleInfoToSold.style.display = 'flex'
 addSoldBtn.setAttribute("disabled", true);
                } else if (response.avaibleQuantity == false) {
                    
                } else {
                    $("#tmpCheckDataTableToSold td").remove();
                    tmpCheckDataTableToSold.style.display = 'flex'
                    dataCheckAvaibleInfoToSold.style.display = 'none'

                    let len = response.length;
                    for (let i = 0; i < len; i++) {
                        let idGood = response[i].idGood;
                        let type_good = response[i].type_good;
                        let good_content = response[i].good_content;
                        let cod = response[i].cod;
                        let color = response[i].color;
                        let quantity = response[i].quantity;
                        let first_price = response[i].first_price;
                        let last_price = response[i].last_price;
                        let id_photo = response[i].id_photo;
                        var tr_str =

                            '<td scope="row"><span data-bs-toggle="tooltip" data-bs-placement="top" title="?????? ????????????">' + cod + '</span></td>' +
                            '<td scope="row" class="text-center"style="min-width:30%;"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="?????? ???? ?????????? ????????????">' + good_content + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="??????????">' + color + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="??????????????????">' + quantity + '????</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="?????????????????? ????????">' + first_price + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="???????? ??????????????">' + last_price + '</span> </td>' +
                            '<td class="c-img-table">' +

                            '<img src="uploads/' + id_photo + '" alt="image">' +
                            '</td>';


                        $("#tmpCheckDataTableToSold ").append(tr_str);

                    }
                    addAvaibleSpinToSold.style.display = 'none';
                    addSoldBtn.removeAttribute('disabled')

                }
                tool_tip();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })

    }
}

const uploadSoldGood = () => {
    if (inputSoldCod.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, '?????????????? ?????? ????????????')
        return false;
    }
    if (quantitySoldGood.value == "" || quantitySoldGood.value == 0) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, '?????????????? ?????????????????? ????????????')
        return false;
    }
    if (setSoldGoodDate.value == ``) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, '?????????????? ???????? ?????????????????? ????????????')
        return false;
    }
    if (lastPriceSoldGood.value == ``) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, '?????????????? ???????? ???? ?????? ?????????????? ??????????')
        return false;
    }
    $.ajax({
        url: 'php-content/upload-sold-goods.php',
        type: 'post',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            soldGoodCod: inputSoldCod.value,
            quantitySoldGood: quantitySoldGood.value,
            SoldGoodDate: setSoldGoodDate.value,
            lastPriceSoldGood: lastPriceSoldGood.value

        }),
        beforeSend: function() {
            addAvaibleSpinToSold.style.display = '';
            dataCheckAvaibleInfoToSold.style.display = 'flex'
            tmpCheckDataTableToSold.style.display = 'none'
            addAvaibleEmptyTxtToSold.style.display = 'none'
            loaderAddSoldBtn.style.display = ''
            addSoldBtn.setAttribute('disabled', true)

        },
        success: function(response) {
            if (response.quantity == false) {
                let date = Date().slice(16, 21);
                console.log(response)
                createToast('Bigupcase', date, '???????????????????? ?????????????????? ???????????? ???? ????????????')
                addSoldBtn.removeAttribute('disabled')
                loaderAddSoldBtn.style.setProperty("display", "none", "important")
                tmpCheckDataTableToSold.style.display = 'flex'
                dataCheckAvaibleInfoToSold.style.display = 'none'

            } else if (response.quantity) {
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, '?????????????????? ?????????????????? ???????????? ??????????????. ?????????????? ????????????????')
                addSoldBtn.removeAttribute('disabled')
                loaderAddSoldBtn.style.setProperty("display", "none", "important")
                tmpCheckDataTableToSold.style.display = 'flex'
                dataCheckAvaibleInfoToSold.style.display = 'none'
                $("#soldGoodform").trigger("reset");
                $("#tmpCheckDataTableToSold td").remove();
                tmpCheckDataTableToSold.style.setProperty("display", "none", "important")
                dataCheckAvaibleInfoToSold.style.display = 'flex'
                addAvaibleSpinToSold.style.display = 'none';
                dataCheckAvaibleInfoToSold.style.display = 'flex'
                addAvaibleTxtToSold.style.display = ''



            } else if (response.avaible == false) {
                let date = Date().slice(16, 21);
                console.log(response)
                createToast('Bigupcase', date, '???????????? ???????????? ???? ??????????')
                addAvaibleEmptyTxtToSold.style.display = ''
                addAvaibleSpinToSold.style.display = 'none';
                loaderAddSoldBtn.style.setProperty("display", "none", "important")
                tmpCheckDataTableToSold.style.setProperty("display", "none", "important")
                dataCheckAvaibleInfoToSold.style.display = 'flex'

            } else {

                $("#tmpCheckDataTableToSold td").remove();
                addSoldBtn.removeAttribute('disabled')
                loaderAddSoldBtn.style.setProperty("display", "none", "important")
                tmpCheckDataTableToSold.style.display = 'flex'

                dataCheckAvaibleInfoToSold.style.display = 'none'
                let len = response.length;
                for (let i = 0; i < len; i++) {
                    let idGood = response[i].idGood;
                    let type_good = response[i].type_good;
                    let good_content = response[i].good_content;
                    let cod = response[i].cod;
                    let color = response[i].color;
                    let quantity = response[i].quantity;
                    let first_price = response[i].first_price;
                    let last_price = response[i].last_price;
                    let soldDate = response[i].soldDate;
                    let id_photo = response[i].id_photo;
                    var tr_str =

                        $('#avaibleGoodsTable').prepend('<tr>' +
                            '<th>' + cod + '</th>' +
                            '<td class="main-cell">' + type_good + ' ' + good_content + '</td>' +
                            '<td>' + color + '</td>' +
                            '<td>' + quantity + '</td>' +
                            '<td>' + first_price + '</td>' +
                            '<td>' + last_price + '</td>' +
                            '<td class="main-cell">' + soldDate + '</td>' +
                            '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop' + idGood + '"></i></td>' +
                            '</tr>');
                    $('.table-scrollable').prepend('<div class="modal fade" id="staticBackdrop' + idGood + '" aria-hidden="true">' +
                        '<div class="modal-dialog modal-dialog-centered modal-img-table">' +
                        '<div class="modal-content">' +
                        '<div class="modal-body">' +
                        '<img src="uploads/' + id_photo + '" class="img-fluid" alt="">' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $("#avaibleGoodsTable ").append(tr_str);
                    $("#soldGoodform").trigger("reset");
                    $("#tmpCheckDataTableToSold td").remove();
                    tmpCheckDataTableToSold.style.setProperty("display", "none", "important")

                    dataCheckAvaibleInfoToSold.style.display = 'flex'
                    addAvaibleSpinToSold.style.display = 'none';
                    dataCheckAvaibleInfoToSold.style.display = 'flex'
                    addAvaibleTxtToSold.style.display = ''
                }

                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, '?????????? ?????????? ????????????')
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
}