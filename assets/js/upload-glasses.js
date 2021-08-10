let idNewGlassValue = document.getElementById('idNewGlass')
let typeGlass = document.getElementById('typeGlass')
let brandPhoneGlass = document.getElementById('brandPhoneGlass')
let colorGlass = document.getElementById('colorGlass')
let firstPriceGlass = document.getElementById('firstPriceGlass')
let quantityNewGlass = document.getElementById('quantityNewGlass')
let lastPriceGlass = document.getElementById('lastPriceGlass')
let loaderNewGlassBtn = document.getElementById('loaderNewGlassBtn')
let uploadNewGlassBtn = document.getElementById('uploadNewGlassBtn')

lastPriceGlass.onkeyup = function() {
    if (!lastPriceGlass.value == ``) {
        uploadNewGlassBtn.removeAttribute('disabled')
    } else {
        uploadNewGlassBtn.setAttribute("disabled", true);

    }
}

uploadNewGlassBtn.addEventListener('click', (e) => {
            e.preventDefault();
    if (idNewGlassValue.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть код товару')
        return false;
    } else if (typeGlass.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть тип скла')
        return false;
    } else if (brandPhoneGlass.value == "") {

        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть марку телефона для скла')
        return false;
    } else if (colorGlass.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть колір скла')
        return false;
    } else if (firstPriceGlass.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть початкову ціну скла')
        return false;

    } else if (quantityNewGlass.value == "" || quantityNewGlass.value == 0) {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть кількість скла')
        return false;
    } else if (lastPriceGlass.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть ціну продажу скла')
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
    formData.append('idNewGlassValue', idNewGlassValue.value.toLowerCase())
    formData.append('typeGlass', typeGlass.value.toLowerCase())
    formData.append('brandPhoneGlass', brandPhoneGlass.value.toLowerCase())
    formData.append('colorGlass', colorGlass.value.toLowerCase())
    formData.append('quantityNewGlass', quantityNewGlass.value.toLowerCase())
    formData.append('firstPriceGlass', firstPriceGlass.value.toLowerCase())
    formData.append('lastPriceGlass', lastPriceGlass.value.toLowerCase())
    $.ajax({
        url: 'php-content/upload-new-glasses.php',
        type: 'POST',
        cache: false,
        data: formData,
        dataType: "json",
        contentType: "application/json",
        processData: false,
        contentType: false,
        beforeSend: function() {
            uploadNewGlassBtn.setAttribute("disabled", true);
            loaderNewGlassBtn.style.display = 'inline-block';
        },
        success: function(response) {
            if (response.avaible == true) {
                loaderNewGlassBtn.style.display = 'none';
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                uploadNewGlassBtn.removeAttribute('disabled')

            } else if(response.status == false){
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Упс... щось пішло не так')
                $('#loaderNewGlassBtn').css("display", "none")
                uploadNewGlassBtn.removeAttribute('disabled')
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
                loaderNewGlassBtn.style.display = 'none';
                uploadNewGlassBtn.removeAttribute('disabled')


                $("#uploadNewCaseForm").trigger("reset");
                imagesForUpload = []
                tmpUrlImg = [];
                [].forEach.call(imagesList, el => {
                    el.innerHTML = ``

                })
                // $('#loaderNewcaseBTn').css("display", "none")
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, 'Новий товар додано')
                $("#uploadNewGlassForm").trigger("reset");

            }
        },
    });
})

function uploadGlassOnTable(temp) {

    let GlassTypeGood = 'скло' +' '+  typeGlass.value.toLowerCase() + ' ' + brandPhoneGlass.value.toLowerCase() ;
    $('#avaibleGoodsTable').prepend('<tr>' +
        '<th>' + idNewGlassValue.value.toLowerCase() + '</th>' +
        '<td>' + GlassTypeGood + '</td>' +
        '<td>' + colorGlass.value.toLowerCase() + '</td>' +
        '<td>' + quantityNewGlass.value.toLowerCase() + '</td>' +
        '<td>' + firstPriceGlass.value.toLowerCase() + '</td>' +
        '<td>' + lastPriceGlass.value.toLowerCase() + '</td>' +
        '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop' + idNewGlassValue.value + '"></i></td>' +
        '</tr>');
    $('.table-scrollable').prepend('<div class="modal fade" id="staticBackdrop' + idNewGlassValue.value + '" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered modal-img-table">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<img src="' + tmpUrlImg + '" class="img-fluid" alt="">' +
        '</div>' +
        '</div>' +
        '</div>')
}