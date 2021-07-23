let uploadBtnCase = document.getElementById('uploadNewCaseBtn');

let idNewCaseValue = document.getElementById('idNewCase')
let typeCase = document.getElementById('typeCase')
let brandCase = document.getElementById('brandCase')
let brandPhone = document.getElementById('brandPhone')
let caseColor = document.getElementById('caseColor')
let firstPriceCase = document.getElementById('firstPriceCase')
let quantityNewCase = document.getElementById('quantityNewCase')
let lastPriceCase = document.getElementById('lastPriceCase')
let formdata = new FormData(document.getElementById('uploadNewCaseForm'));


uploadBtnCase.addEventListener('click', (e) => {

    if (idNewCase.value == "") {
        alert("Введіть код чохла")
        return false;
    } else if (typeCase.value == "") {
        alert("Введіть типццччіч чохла")
        return false;
    } else if (brandCase.value == "") {
        alert("Введіть бренд чохла")
        return false;
    } else if (brandPhone.value == "") {
        alert("Введіть марку телефона")
        return false;
    } else if (caseColor.value == "") {
        alert("Введіть колір чохла")
        return false;
    } else if (firstPriceCase.value == "") {
        alert("Введіть початкову ціну чохла")
        return false;
    } else if (quantityNewCase.value == "" || quantityNewCase.value == 0) {
        alert("Вкажіть кількість чохлів")
        return false;
    } else if (lastPriceCase.value == "") {
        alert("Вкажіть ціну продажу чохла")
        return false;
    }
    e.preventDefault();
    let formData = new FormData();
    for (let key in imagesForUpload) {
        formData.append(key, imagesForUpload[key])
    }
       let formDataa = new FormData();
     for (let key in imagesForUpload) {
         formDataa.append(key, imagesForUpload[key])
             console.log(formDataa)

     }
    $.ajax({

        url: 'php-content/upload-new-cases.php',
        type: 'POST',
        cache: false,
        data: { 'idNewCase': idNewCaseValue.value, 'typeCase': typeCase.value, 'brandPhone': brandPhone.value, 'caseColor': caseColor.value, 'brandCase': brandCase.value, 'firstPriceCase': firstPriceCase.value, 'quantityNewCase': quantityNewCase.value, 'lastPriceCase': lastPriceCase.value ,formDataa},
        dataType: 'html',
        processData: false,
        contentType: false,
        beforeSend: function() {
            uploadBtn.setAttribute("disabled", true);
        },
        success: function(data) {
            if (!data) {
                alert("Помилка");
            } else {

                $("#uploadNewCaseForm").trigger("reset");
                uploadBtn.removeAttribute('disabled');
                $("#info-table").innerHTML = idNewCaseValue.value;
                alert("все круто")

            }
        },
    });


})