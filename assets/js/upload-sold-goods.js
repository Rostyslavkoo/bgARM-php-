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
// let quantityNewAvaibleGood = document.getElementById('quantityNewAvaibleGood')


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
                } else {
                    console.log(response)
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

                            '<td scope="row"><span data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">' + cod + '</span></td>' +
                            '<td scope="row" class="text-center"style="min-width:20rem;"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип та назва товару">' + good_content + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір">' + color + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість">' + quantity + 'шт</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Початкова ціна">' + first_price + '</span> </td>' +
                            '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу">' + last_price + '</span> </td>' +
                            '<td class="c-img-table">' +

                            '<img src="uploads/' + id_photo + '" alt="image">' +
                            '</td>';


                        $("#tmpCheckDataTableToSold ").append(tr_str);

                    }
                    addAvaibleSpinToSold.style.display = 'none';
                    addSoldBtn.removeAttribute('disabled')

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })

    }
}

const uploadSoldGood = () => {
    if (quantitySoldGood.value == "" || quantitySoldGood.value == 0) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Вкажіть кількість товару')
        return false;
    }  if (setSoldGoodDate.value == ``) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Вкажіть дату проданого товару')
        return false;
    }if (lastPriceSoldGood.value == ``) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Вкажіть ціну за яку продали товар')
        return false;
    }
    console.log(setSoldGoodDate.value)
    $.ajax({
        url: 'php-content/upload-sold-goods.php',
        type: 'post',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            soldGoodCod: inputSoldCod.value,
            quantitySoldGood: quantitySoldGood.value,
            setSoldGoodDate: setSoldGoodDate.value

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
                let id_photo = response[i].id_photo;
                var tr_str =

                    '<td scope="row"><span data-bs-toggle="tooltip" data-bs-placement="top" title="Код товару">' + cod + '</span></td>' +
                    '<td scope="row" class="text-center"style="min-width:50%;"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Тип та назва товару">' + good_content + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Колір">' + color + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Кількість">' + quantity + 'шт</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Початкова ціна">' + first_price + '</span> </td>' +
                    '<td scope="row"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="Ціна продажу">' + last_price + '</span> </td>' +
                    '<td class="c-img-table">' +

                    '<img src="uploads/' + id_photo + '" alt="image">' +
                    '</td>';


                $("#tmpCheckDataTableToSold ").append(tr_str);

            }
         let date = Date().slice(16, 21);

            createToast('Bigupcase', date, 'Кількість товару змінена, оновіть сторінку')
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
}