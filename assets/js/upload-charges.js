let uploadBtn = document.getElementById('uploadNewChargesBtn');
let idNewChargeValue = document.getElementById('idNewCharge')
let typeCharge = document.getElementById('typeCharge')
let brandCharge = document.getElementById('brandCharge')
let connector = document.getElementById('connector')
let colorCharge = document.getElementById('colorCharge')
let length = document.getElementById('length')
let firstPriceCharge = document.getElementById('firstPriceCharge')
let imageCase = document.getElementById('image')
let quantityNewCharge = document.getElementById('quantityNewCharge')
let lastPriceCharge = document.getElementById('lastPriceCharge')
let loaderNewChargeBtn = document.getElementById('loaderNewChargeBtn')

uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (idNewChargeValue.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть код товару')
        return false;
    } else if (typeCharge.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть тип зарядки')
        return false;
    } else if (brandCharge.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть бренд зарядки')
        return false;
    } else if (connector.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть роз\'єм зарядки')
        return false;
    } else if (colorCharge.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть колір зарядки')
        return false;
    } else if (length.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть довжину зарядки')
        return false;
    } else if (firstPriceCharge.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть початкову ціну зарядки')
        return false;
    } else if (quantityNewCharge.value == "" || quantityNewCharge.value == 0) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Вкажіть кількість зарядкок')
        return false;
    } else if (lastPriceCharge.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Вкажіть ціну продажу зарядки')
        return false;
    }
    if (!imagesForUpload.length > 0) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Додайте зображення до товару')
        return false
    }
    let formData = new FormData();
    for (let key in imagesForUpload) { // upload img in formdata
        formData.append(key, imagesForUpload[key])
    }
    // upload input value in formdata
    formData.append('idNewChargeValue', idNewChargeValue.value.toLowerCase())
    formData.append('typeCharge', typeCharge.value.toLowerCase())
    formData.append('brandCharge', brandCharge.value.toLowerCase())
    formData.append('connector', connector.value.toLowerCase())
    formData.append('length', length.value.toLowerCase())
    formData.append('colorCharge', colorCharge.value.toLowerCase())
    formData.append('firstPriceCharge', firstPriceCharge.value.toLowerCase())
    formData.append('quantityNewCharge', quantityNewCharge.value.toLowerCase())
    formData.append('lastPriceCharge', lastPriceCharge.value.toLowerCase())
    $.ajax({
        url: 'php-content/upload-new-charges.php',
        type: 'POST',
        cache: false,
        data: formData,
        dataType: "json",
        contentType: "application/json",
        processData: false,
        contentType: false,
        beforeSend: function() {
            uploadBtn.setAttribute("disabled", true);
            loaderNewChargeBtn.style.display = 'inline-block';
        },
        success: function(response) {
            if (response.avaible == true) {
                loaderNewChargeBtn.style.display = 'none';
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                uploadBtn.removeAttribute('disabled')
            } else if(response.status == false){
                  loaderNewChargeBtn.style.display = 'none';
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Упс... щось пішло не так')
                uploadBtn.removeAttribute('disabled')
            }else {
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
                        '<tr>' +
                        '<th>' + cod + '</th>' +
                        '<td>' + type_good+' '+good_content + '</td>' +
                        '<td>' + color + '</td>' +
                        '<td>' + quantity + '</td>' +
                        '<td>' + first_price + '</td>' +
                        '<td>' + last_price + '</td>' +
                        '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop' + idGood + '"></i></td>'
                    '</tr>';
                    var modalContent = 
                   '<div class="modal fade" id="staticBackdrop' + idGood + '" aria-hidden="true">' +
                        '<div class="modal-dialog modal-dialog-centered modal-img-table">' +
                        '<div class="modal-content">' +
                        '<div class="modal-body">' +
                        '<img src="' + tmpUrlImg + '" class="img-fluid" alt="">' +
                        '</div>' +
                        '</div>' +
                        '</div>';


                    $("#avaibleGoodsTable ").prepend(tr_str);
                    $('.table-scrollable').prepend(modalContent);

                }
                loaderNewChargeBtn.style.display = 'none';
                uploadBtn.setAttribute('disabled',true)
                $("#uploadNewCaseForm").trigger("reset");
                imagesForUpload = []
                tmpUrlImg = [];
                [].forEach.call(imagesList, el => {
                    el.innerHTML = ``
                }) // $('#loaderNewcaseBTn').css("display", "none")
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Новий товар додано')
                $("#uploadNewChargeForm").trigger("reset");
            }
        },
    });
})

