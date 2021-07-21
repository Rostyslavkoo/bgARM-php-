 let dragAndDrop = document.querySelector('.drag-and-drop-content')
 let dragAndDropIco = document.querySelector('.bi-file-earmark-plus')
 let imagesList = document.querySelector('.drag-and-drop-img')
 let uploadNewGoodBtn = document.querySelector('.upload-newgood-btn')
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



 let imagesForUpload = [];
 const types = ['image/jpeg', 'image/png', 'image/webp']
 dragAndDrop.addEventListener('dragenter', (e) => {
     e.preventDefault();
     dragAndDrop.classList.add('drag-and-drop-content__active')
 })

 dragAndDrop.addEventListener('dragleave', (e) => {
     e.preventDefault();
     dragAndDrop.classList.remove('drag-and-drop-content__active')
 })

 dragAndDrop.addEventListener('dragover', (e) => {
     e.preventDefault();
 })

 dragAndDrop.addEventListener('drop', (e) => {
     e.preventDefault();

     const files = e.dataTransfer.files
     for (let key in files) {
         if (!types.includes(files[key].type) || imagesForUpload.length > 0) {
             continue;

         }
         imagesForUpload.push(files[key])
         let imgTempUrl = URL.createObjectURL(files[key])

         console.log(imgTempUrl)
         imagesList.innerHTML += `<img src="${imgTempUrl}" alt="">`

     }
     console.log(imagesForUpload)

     if (imagesForUpload.length > 0) {
         uploadNewGoodBtn.removeAttribute('disabled')
     }


 })

 const uploadImg = () => {

    if (idNewCase.value == "") {
        alert("Введіть код чохла")
        return false;
    } else if (typeCase.value == "") {
        alert("Введіть тип чохла")
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
        return false
    }
     let formData = new FormData();
     for (let key in imagesForUpload) {
         formData.append(key, imagesForUpload[key])
                  console.log(imagesForUpload[key])
     }
     formData.append('idNewCase',idNewCaseValue.value)
     formData.append('typeCase',typeCase.value)
     formData.append('brandPhone',brandPhone.value)
     formData.append('caseColor',caseColor.value)
     formData.append('brandCase',brandCase.value)
     formData.append('firstPriceCase',firstPriceCase.value)
     formData.append('quantityNewCase',quantityNewCase.value)
     formData.append('lastPriceCase',lastPriceCase.value)
     // fetch('php-content/upload-new-cases.php', {
     //         method: "POST",
     //         body: {'idNewCase': idNewCaseValue.value, 'typeCase': typeCase.value, 'brandPhone': brandPhone.value, 'caseColor': caseColor.value, 'brandCase': brandCase.value, 'firstPriceCase': firstPriceCase.value, 'quantityNewCase': quantityNewCase.value, 'lastPriceCase': lastPriceCase.value }
     //     })
         $.ajax({
        url: 'php-content/upload-new-cases.php',
        type: 'POST',
        cache: false,
        data: formData,
        dataType: 'html',
        processData: false,
contentType: false,
        beforeSend: function() {
            uploadBtnCase.setAttribute("disabled", true);
            $('#loaderNewcaseBTn').css("display","inline-block")
        },
        success: function(data) {
            if (!data) {
                alert("Помилка");
            } else {

                $("#uploadNewCaseForm").trigger("reset");
                imagesForUpload = []
                imagesList.innerHTML = ``
                            $('#loaderNewcaseBTn').css("display","none")

            }
        },
    });
         // .then(response => response.json())
         // .then(result => {
         //     if (result.status) {
                 // imagesForUpload = []
                 // imagesList.innerHTML = ``
                 // uploadNewGoodBtn.setAttribute("disabled", true)
         //     }

         // })
 }

 const inputElement = document.getElementById("image");
 inputElement.addEventListener("change", handleFiles, false);

 function handleFiles() {
     const fileList = this.files; /* now you can work with the file list */
     for (let key in fileList) {
         if (!types.includes(fileList[key].type) || imagesForUpload.length > 0) {
             continue;

         }
         imagesForUpload.push(fileList[key])
         let imgTempUrl = URL.createObjectURL(fileList[key])
         console.log(imgTempUrl)
         imagesList.innerHTML += `<img src="${imgTempUrl}" alt="">`
     }

     console.log(fileList)
  if (imagesForUpload.length > 0) {
         uploadNewGoodBtn.removeAttribute('disabled')
     }
 }
