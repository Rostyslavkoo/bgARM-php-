let option ={
	animation:true,
	autohide:false
};
let avaibleGoodToats = document.getElementById('avaibleGoodToats')
function Toasty(){
	let toastElement = new bootstrap.Toast(avaibleGoodToats, option)
	toastElement.show()
}
// document.getElementById('activate').addEventListener('click', () => {
//   createToast('hello', 'a', 'b');
// });

function createToast(title, smallText, text) {
  let id = new Date().getTime();
  let html = `  <div class="toast m-1" role="alert" aria-live="assertive"  aria-atomic="true" id=${id}>
    <div class="toast-header">
     <img src="assets/img/favicon/favicon-96x96.webp" class="rounded mr-2" alt="logo" style="width: 1rem; height: 1rem; margin-right:0.3rem;">
      <strong class="me-auto">${title}</strong>
      <small class="text-muted">${smallText}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${text}
    </div>`;

  document.getElementById('toast-container').innerHTML += html;
  $(`#${id}`).toast('show');
}