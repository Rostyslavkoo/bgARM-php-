let idNewAnotherValue = document.getElementById('idNewAnother')
let typeAnother = document.getElementById('typeGoodAnother')
let describeAnotherGood = document.getElementById('describeAnotherGood')
let colorAnother = document.getElementById('colorAnother')
let firstPriceAnother = document.getElementById('firstPriceAnother')
let quantityNewAnother = document.getElementById('quantityNewAnother')
let lastPriceAnother = document.getElementById('lastPriceAnother')
let loaderNewAnotherBtn = document.getElementById('loaderNewAnotherBtn')
let uploadNewAnotherBtn = document.getElementById('uploadNewAnotherBtn')



uploadNewAnotherBtn.addEventListener('click', (e) => {
            e.preventDefault();
    if (idNewAnotherValue.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть код товару')
        return false;
    } else if (typeAnother.value == "") {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть тип товару')
        return false;
    } else if (describeAnotherGood.value == "") {

        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть опис товару')
        return false;
    } else if (describeAnotherGood.value.length > 60) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Опис товару не має перевищувати 60 символів')
        return false;
    } else if (colorAnother.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть колір товару')
        return false;
    } else if (firstPriceAnother.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть початкову ціну товару')
        return false;

    } else if (quantityNewAnother.value == "" || quantityNewAnother.value == 0) {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть кількість товару')
        return false;
    } else if (lastPriceAnother.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть ціну продажу товару')
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
    formData.append('idNewAnotherValue', idNewAnotherValue.value.toLowerCase())
    formData.append('typeAnother', typeAnother.value.toLowerCase())
    formData.append('describeAnotherGood', describeAnotherGood.value.toLowerCase())
    formData.append('colorAnother', colorAnother.value.toLowerCase())
    formData.append('quantityNewAnother', quantityNewAnother.value.toLowerCase())
    formData.append('firstPriceAnother', firstPriceAnother.value.toLowerCase())
    formData.append('lastPriceAnother', lastPriceAnother.value.toLowerCase())
    $.ajax({
        url: 'php-content/upload-new-another.php',
        type: 'POST',
        cache: false,
        data: formData,
        dataType: "json",
        contentType: "application/json",
        processData: false,
        contentType: false,
        beforeSend: function() {
            uploadNewAnotherBtn.setAttribute("disabled", true);
            loaderNewAnotherBtn.style.display = 'inline-block';
        },
        success: function(response) {
            if (response.avaible == true) {
                loaderNewAnotherBtn.style.display = 'none';
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                uploadNewAnotherBtn.removeAttribute('disabled')

            } else if(response.status == false){
                    loaderNewAnotherBtn.style.display = 'none';
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Упс... щось пішло не так')
                uploadNewAnotherBtn.removeAttribute('disabled')
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
                loaderNewAnotherBtn.style.display = 'none';
                uploadNewAnotherBtn.removeAttribute('disabled')


                $("#uploadNewAnotherForm").trigger("reset");
                imagesForUpload = []
                tmpUrlImg = [];
                [].forEach.call(imagesList, el => {
                    el.innerHTML = ``

                })
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, 'Новий товар додано')
                $("#uploadNewGlassForm").trigger("reset");

            }
        },
    });
})
