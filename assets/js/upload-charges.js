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

lastPriceCharge.onkeyup = function() {
    if (!lastPriceCharge.value == ``) {
        uploadBtn.removeAttribute('disabled')
    } else {
        uploadBtn.setAttribute("disabled", true);

    }
}

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
        success: function(data) {
            if (data.avaible == true) {
                loaderNewChargeBtn.style.display = 'none';
                let date = Date().slice(16, 21);

                createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                uploadBtn.removeAttribute('disabled')

            } else {
                loaderNewChargeBtn.style.display = 'none';
                uploadChargeOnTable()
                uploadBtn.removeAttribute('disabled')


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

function uploadChargeOnTable(temp) {

    let ChargeTypeGood = 'зарядка' + ' ' + brandCharge.value + ' ' + connector.value + ' ' + typeCharge.value + ' ' + length.value + 'м';
    $('#avaibleGoodsTable').prepend('<tr>' +
        '<th>' + idNewChargeValue.value + '</th>' +
        '<td>' + ChargeTypeGood + '</td>' +
        '<td>' + colorCharge.value + '</td>' +
        '<td>' + quantityNewCharge.value + '</td>' +
        '<td>' + firstPriceCharge.value + '</td>' +
        '<td>' + lastPriceCharge.value + '</td>' +
        '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop' + idNewChargeValue.value + '"></i></td>' +
        '</tr>');
    $('.table-scrollable').prepend('<div class="modal fade" id="staticBackdrop' + idNewChargeValue.value + '" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered modal-img-table">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<img src="' + tmpUrlImg + '" class="img-fluid" alt="">' +
        '</div>' +
        '</div>' +
        '</div>')
    console.log('новий товар' + ChargeTypeGood + ' доданий')
    console.log(tmpUrlImg)
}