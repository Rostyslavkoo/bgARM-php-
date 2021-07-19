 let dragAndDrop = document.querySelector('.drag-and-drop-content')
 let dragAndDropIco = document.querySelector('.bi-file-earmark-plus')
 let imagesList = document.querySelector('.drag-and-drop-img')
 let uploadNewGoodBtn = document.querySelector('.upload-newgood-btn')

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
     let formData = new FormData();
     for (let key in imagesForUpload) {
         formData.append(key, imagesForUpload[key])
     }
     fetch('php-content/upload.php', {
             method: "POST",
             body: formData
         })
         .then(response => response.json())
         .then(result => {
             if (result.status) {
                 imagesForUpload = []
                 imagesList.innerHTML = ``
                 uploadNewGoodBtn.setAttribute("disabled", true)
             }

         })

 }

 const inputElement = document.getElementById("new_case_img");
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