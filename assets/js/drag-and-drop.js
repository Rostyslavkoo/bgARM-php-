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

 //  upload img by input

 const inputElement = document.querySelectorAll(".inputImages");

 [].forEach.call((inputElement), el => {
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
         [].forEach.call((imagesList), elList => {
             elList.innerHTML += `<img src="${imgTempUrl}" alt="">`

         })
         tmpUrlImg = [imgTempUrl]
     }

     console.log(fileList)
     if (imagesForUpload.length > 0) {
         uploadNewGoodBtn.removeAttribute('disabled')
     }
 }