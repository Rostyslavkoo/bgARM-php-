 const dragAndDrop = document.querySelectorAll('.drag-and-drop-content');
 // let dragAndDropCharge = document.querySelector('#drag-and-drop-charge')
 let dragAndDropIco = document.querySelector('.bi-file-earmark-plus')
 const imagesList = document.querySelectorAll('.drag-and-drop-img')
 let imagesListCharge = document.querySelector('#drag-and-drop-img-charge')
 let uploadNewGoodBtn = document.querySelector('#uploadNewCaseBtn')
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
 let tmpUrlImg = [];
 const types = ['image/jpeg', 'image/png', 'image/webp'];


 const dragEnter = function() {
     this.classList.add('drag-and-drop-content__active')

 }
 const dragLeave = function() {
     this.classList.remove('drag-and-drop-content__active')

 }
 const dragOver = function(e) {
     e.preventDefault();

 }
 const dragLeavee = function() {
     this.classList.remove('drag-and-drop-content__active')

 }


 const dragDrop = function(e) {
     e.preventDefault();
     const files = e.dataTransfer.files
     for (let key in files) { // validate upload img
         if (!types.includes(files[key].type) || imagesForUpload.length > 0) {
             continue;

         }
         imagesForUpload.push(files[key]) // create trmporal img
         let imgTempUrl = URL.createObjectURL(files[key]);
         [].forEach.call(imagesList, el => {
             el.innerHTML += `<img src="${imgTempUrl}" alt="">` // output img

         })
         this.classList.remove('drag-and-drop-content__active')

         tmpUrlImg = [imgTempUrl] // upload img in massive
     }
 }
 // unlock upload
 if (imagesForUpload.length > 0) {
     uploadNewGoodBtn.removeAttribute('disabled')
 }
 dragAndDrop.forEach((cell) => {
     cell.addEventListener('dragover', dragOver);
     cell.addEventListener('dragenter', dragEnter);
     cell.addEventListener('dragleave', dragLeavee);
     cell.addEventListener('drop', dragDrop);

 })

 // unlock upload
 if (imagesForUpload.length > 0) {
     uploadNewGoodBtn.removeAttribute('disabled')
     uploadBtn.removeAttribute('disabled')
 }
 // ulock upload btn
 lastPriceCase.onkeyup = function() {
     if (!lastPriceCase.value == ``) {
         uploadNewGoodBtn.removeAttribute('disabled')
     } else {
         uploadNewGoodBtn.setAttribute("disabled", true);

     }

 }
 //  upload cases
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
         dataType: 'html',
         processData: false,
         contentType: false,
         beforeSend: function() {
             uploadBtnCase.setAttribute("disabled", true);
             $('#loaderNewcaseBTn').css("display", "inline-block")
         },
         success: function(data) {

             // check is avaible good
             if (data.match('This product is already in stock')) {
                 let date = Date().slice(16, 21);

                 createToast('Bigupcase', date, 'Даний товар уже існує на складі')
                 $('#loaderNewcaseBTn').css("display", "none")
                 uploadNewGoodBtn.removeAttribute('disabled')
             } else {

                 uploadDataOnTable()
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

 // upload data on table
 function uploadDataOnTable(temp) {

     let caseTypeGood = brandCase.value + ' ' + typeCase.value + ' ' + brandPhone.value;
     $('#avaibleGoodsTable').prepend('<tr>' +
         '<th>' + idNewCaseValue.value + '</th>' +
         '<td>' + caseTypeGood + '</td>' +
         '<td>' + caseColor.value + '</td>' +
         '<td>' + quantityNewCase.value + '</td>' +
         '<td>' + firstPriceCase.value + '</td>' +
         '<td>' + lastPriceCase.value + '</td>' +
         '<td class=" b-img-table"><i class="bi bi-image" data-bs-toggle="modal" data-bs-target="#staticBackdrop' + idNewCaseValue.value + '"></i></td>' +
         '</tr>');
     $('.table-scrollable').prepend('<div class="modal fade" id="staticBackdrop' + idNewCaseValue.value + '" aria-hidden="true">' +
         '<div class="modal-dialog modal-dialog-centered modal-img-table">' +
         '<div class="modal-content">' +
         '<div class="modal-body">' +
         '<img src="' + tmpUrlImg + '" class="img-fluid" alt="">' +
         '</div>' +
         '</div>' +
         '</div>')
     console.log('новий товар' + caseTypeGood + ' доданий')
     console.log(tmpUrlImg)
 }

 //  upload img by input
 const inputElement = document.querySelectorAll(".inputImages");
 [].forEach.call((inputElement), el =>{
 el.addEventListener("change", handleFiles, false);

 })

 function handleFiles() {
     const fileList = this.files; /* now you can work with the file list */
     for (var key in fileList) {
         if (!types.includes(fileList[key].type) || imagesForUpload.length > 0) {
             continue;

         }
         imagesForUpload.push(fileList[key])
         var imgTempUrl = URL.createObjectURL(fileList[key])
         console.log(imgTempUrl);
          [].forEach.call((imagesList), elList =>{
         elList.innerHTML += `<img src="${imgTempUrl}" alt="">`

 })
         imagesList.innerHTML += `<img src="${imgTempUrl}" alt="">`
         tmpUrlImg = [imgTempUrl]
     }

     console.log(fileList)
     if (imagesForUpload.length > 0) {
         uploadNewGoodBtn.removeAttribute('disabled')
     }
 }
