let inputAvaibleCod = document.getElementById('idAvaibleGood')
let addAvaibleBtn = document.getElementById('addAvaibleBtn')
let addAvaibleTxt = document.getElementById('addAvaibleTxt')
let addAvaibleEmptyTxt = document.getElementById('addAvaibleEmptyTxt')
let addAvaibleSpin = document.getElementById('addAvaibleSpin')
let dataCheckAvaibleInfo = document.getElementById('dataCheckAvaibleInfo')
let tmpCheckDataTable = document.getElementById('tmpCheckDataTable')
let loaderAddAvaibleBtn = document.getElementById('loaderAddAvaibleBtn')
let quantityNewAvaibleGood = document.getElementById('quantityNewAvaibleGood')

function tool_tip() {
     $('[data-bs-toggle="tooltip"]').tooltip()
}

inputAvaibleCod.onkeyup = function(e) {
    e.preventDefault();
    // addAvaibleSpin.style.display = '';
    addAvaibleTxt.style.display = 'none';
    addAvaibleEmptyTxt.style.display = 'none'
    if (inputAvaibleCod.value == ``) {
        tmpCheckDataTable.style.setProperty("display", "none", "important")

        dataCheckAvaibleInfo.style.display = 'flex'
        addAvaibleBtn.setAttribute("disabled", true);
        addAvaibleTxt.style.display = '';
        addAvaibleSpin.style.display = 'none';
        addAvaibleEmptyTxt.style.display = 'none';
    } else {

        $.ajax({
            url: 'php-content/check-avaible-goods.php',
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                avaibleGoodCod: inputAvaibleCod.value

            }),
            beforeSend: function() {
                addAvaibleSpin.style.display = '';
                dataCheckAvaibleInfo.style.display = 'flex'
                tmpCheckDataTable.style.setProperty("display", "none", "important")

            },

            success: function(response) {
                if (response.avaible == false) {
                    console.log(response)
                    addAvaibleEmptyTxt.style.display = ''
                    addAvaibleSpin.style.display = 'none';

                    tmpCheckDataTable.style.setProperty("display", "none", "important")
                    dataCheckAvaibleInfo.style.display = 'flex'
                } else {

                    console.log(response)
                    $("#tmpCheckDataTable td").remove();

                    tmpCheckDataTable.style.display = 'flex'
                    dataCheckAvaibleInfo.style.display = 'none'
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

                            '<td scope="row"><span data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">' + cod + '</span></td>' +
                            '<td scope="row" class="text-center"style="min-width:30%;"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип та назва товару">' + good_content + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір">' + color + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість">' + quantity + 'шт</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Початкова ціна">' + first_price + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу">' + last_price + '</span> </td>' +
                            '<td class="c-img-table">' +

                            '<img src="uploads/' + id_photo + '" alt="image">' +
                            '</td>';


                        $("#tmpCheckDataTable ").append(tr_str);

                    }
                    addAvaibleSpin.style.display = 'none';
                    addAvaibleBtn.removeAttribute('disabled')

                }
 tool_tip(); 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })

    }
}

const uploadAvaibleGood = () => {
    if (quantityNewAvaibleGood.value == "" || quantityNewAvaibleGood.value == 0) {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть кількість товару')
        return false;
    }
    $.ajax({
        url: 'php-content/upload-avaible-goods.php',
        type: 'post',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            avaibleGoodCod: inputAvaibleCod.value,
            quantityNewAvaibleGood: quantityNewAvaibleGood.value
        }),
        beforeSend: function() {
            addAvaibleSpin.style.display = '';
            dataCheckAvaibleInfo.style.display = 'flex'
            tmpCheckDataTable.style.display = 'none'
            addAvaibleEmptyTxt.style.display = 'none'
            loaderAddAvaibleBtn.style.display = ''
            addAvaibleBtn.setAttribute('disabled', true)

        },
        success: function(response) {
            $("#tmpCheckDataTable td").remove();
            addAvaibleBtn.removeAttribute('disabled')
            loaderAddAvaibleBtn.style.setProperty("display", "none", "important")

            tmpCheckDataTable.style.display = 'flex'
            dataCheckAvaibleInfo.style.display = 'none'
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

                    '<td scope="row"><span z-index="9999" data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">' + cod + '</span></td>' +
                    '<td scope="row" class="text-center"style="min-width:30%;"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип та назва товару">'+ good_content + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір">' + color + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість">' + quantity + 'шт</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Початкова ціна">' + first_price + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу">' + last_price + '</span> </td>' +
                    '<td class="c-img-table">' +

                    '<img src="uploads/' + id_photo + '" alt="image">' +
                    '</td>';


                $("#tmpCheckDataTable ").append(tr_str);

            }

         let date = Date().slice(16, 21);

            createToast('Bigupcase', date, 'Кількість товару змінена, оновіть сторінку')
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
}
$(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })