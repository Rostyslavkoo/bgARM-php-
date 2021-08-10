// ulock upload btn
lastPriceCase.onkeyup = function() {
    if (!lastPriceCase.value == ``) {
        uploadNewGoodBtn.removeAttribute('disabled')
    } else {
        uploadNewGoodBtn.setAttribute("disabled", true);

    }

}
//  upload cases

uploadBtnCase.addEventListener("click", function(e) {
    e.preventDefault();
})
const uploadImg = () => {

    // validate inputs
    if (idNewCase.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть код чохла')
        return false;
    } else if (typeCase.value == "") {

        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть тип чохла')
        return false;
    } else if (brandCase.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть бренд чохла')
        return false;
    } else if (brandPhone.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть марку телефона')
        return false;
    } else if (caseColor.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть колір чохла')
        return false;
    } else if (firstPriceCase.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Введіть початкову ціну чохла')
        return false;
    } else if (quantityNewCase.value == "" || quantityNewCase.value == 0) {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть кількість чохлів')
        return false;
    } else if (lastPriceCase.value == "") {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Вкажіть ціну продажу чохла')
        return false
    }
    if (!imagesForUpload.length > 0) {
        let date = Date().slice(16, 21);

        createToast('Bigupcase', date, 'Додайте зображення до товару')
        return false
    }


    let formData = new FormData();
    for (let key in imagesForUpload) { // upload img in formdata
        formData.append(key, imagesForUpload[key])
        console.log(imagesForUpload[key])
    }
    // upload input value in formdata
    formData.append('idNewCase', idNewCaseValue.value.toLowerCase())
    formData.append('typeCase', typeCase.value.toLowerCase())
    formData.append('brandPhone', brandPhone.value.toLowerCase())
    formData.append('caseColor', caseColor.value.toLowerCase())
    formData.append('brandCase', brandCase.value.toLowerCase())
    formData.append('firstPriceCase', firstPriceCase.value.toLowerCase())
    formData.append('quantityNewCase', quantityNewCase.value.toLowerCase())
    formData.append('lastPriceCase', lastPriceCase.value.toLowerCase())

    // upload data in database
    $.ajax({
        url: 'php-content/upload-new-cases.php',
        type: 'POST',
        cache: false,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        beforeSend: function() {
            uploadBtnCase.setAttribute("disabled", true);
            $('#loaderNewcaseBTn').css("display", "inline-block")
        },
        success: function(response) {
            // check is avaible good
            if (response.avaible == true) {
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                $('#loaderNewcaseBTn').css("display", "none")
                uploadNewGoodBtn.removeAttribute('disabled')
            } else if(response.status == false){
                let date = Date().slice(16, 21);
                createToast('Bigupcase', date, 'Упс... щось пішло не так')
                $('#loaderNewcaseBTn').css("display", "none")
                uploadNewGoodBtn.removeAttribute('disabled')
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
                $("#uploadNewCaseForm").trigger("reset");
                imagesForUpload = []

                tmpUrlImg = [];
                [].forEach.call(imagesList, el => {
                    el.innerHTML = ``

                })
                $('#loaderNewcaseBTn').css("display", "none")
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, 'Новий товар додано')
            }
        },
    });
}
