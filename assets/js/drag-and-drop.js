 let dragAndDrop = document.querySelector('.drag-and-drop-content')
 let dragAndDropIco = document.querySelector('.bi-file-earmark-plus')
 let imagesList = document.querySelector('.drag-and-drop-img')

 let imagesForUpload = [];
const types = ['image/jpeg', 'image/png','image/webp']
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
         if (!types.includes(files[key].type)) {
             continue;
         }
         imagesForUpload.push(files[key])
         let imgTempUrl = URL.createObjectURL(files[key])

         console.log(imgTempUrl)
         imagesList.innerHTML += `<img src="${imgTempUrl}" alt="">`

     }
     console.log(imagesForUpload)


 })

 // <img src="assets/img/test-case.jpeg" alt="">