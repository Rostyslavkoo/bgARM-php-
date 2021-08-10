function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function(support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)

})


$('.btn-plus, .btn-minus').on('click', function(e) {
    const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
    const input = $(e.target).closest('.input-group').find('input');
    if (input.is('input')) {
        input[0][isNegative ? 'stepDown' : 'stepUp']()
    }
})
let addCase = document.querySelector('.add_cases')
let addCharge = document.querySelector('.add_charges')
let addGlass = document.querySelector('.add_glasses')
let addAnother = document.querySelector('.add_another')
let btnCase = document.querySelector('#btnAddCase')
let btnCharge = document.querySelector('#btnAddCharge')
let btnGlass = document.querySelector('#btnAddGlass')
let btnAnother = document.querySelector('#btnAddAnother')
let addGoodsModal = document.querySelector('#addGoodsModal')
let idNewCase = document.querySelector('#idNewCase')
let idNewCharge = document.querySelector('#idNewCharge')
let idNewGlass = document.querySelector('#idNewGlass')
let idNewAnother = document.querySelector('#idNewAnother')
var c_fourth_breakpoint = window.matchMedia("(max-width: 530px)")

function show_cases() {
    if (c_fourth_breakpoint.matches) {
        addCase.style.display = 'block';
    } else {
        addCase.style.display = 'flex';
    }
    imagesForUpload = []
    tmpUrlImg = [];
    [].forEach.call(imagesList, el => {
        el.innerHTML = ``
    })
    addAnother.style.display = 'none';
    addCharge.style.display = 'none';
    addGlass.style.display = 'none';
    btnCase.classList.add("_active-btn");
    btnGlass.classList.remove("_active-btn");
    btnCharge.classList.remove("_active-btn");
    btnAnother.classList.remove("_active-btn");

    setTimeout(function() {
        document.querySelector('#idNewCase').focus();
    }, 1000);
}

function show_charge() {
    if (c_fourth_breakpoint.matches) {
        addCharge.style.display = 'block';
    } else {
        addCharge.style.display = 'flex';
    }
    imagesForUpload = []
    tmpUrlImg = [];
    [].forEach.call(imagesList, el => {
        el.innerHTML = ``
    })
    addAnother.style.display = 'none';
    addGlass.style.display = 'none';
    addCase.style.display = 'none';
    btnCharge.classList.add("_active-btn");
    btnCase.classList.remove("_active-btn");
    btnGlass.classList.remove("_active-btn");
    btnAnother.classList.remove("_active-btn");

    idNewCharge.focus();
}

function show_glasse() {
    if (c_fourth_breakpoint.matches) {
        addGlass.style.display = 'block';
    } else {
        addGlass.style.display = 'flex';
    }
    imagesForUpload = []
    tmpUrlImg = [];
    [].forEach.call(imagesList, el => {
        el.innerHTML = ``
    })
    addAnother.style.display = 'none';
    addCharge.style.display = 'none';
    addCase.style.display = 'none';
    btnGlass.classList.add("_active-btn");
    btnCase.classList.remove("_active-btn");
    btnCharge.classList.remove("_active-btn");
    btnAnother.classList.remove("_active-btn");

    idNewGlass.focus()
}

function show_another() {
    if (c_fourth_breakpoint.matches) {
        addAnother.style.display = 'block';
    } else {
        addAnother.style.display = 'flex';
    }
    imagesForUpload = []
    tmpUrlImg = [];
    [].forEach.call(imagesList, el => {
        el.innerHTML = ``
    })
    addCharge.style.display = 'none';
    addCase.style.display = 'none';
    addGlass.style.display = 'none';
    btnAnother.classList.add("_active-btn");
    btnCase.classList.remove("_active-btn");
    btnCharge.classList.remove("_active-btn");
    btnGlass.classList.remove("_active-btn");
    idNewAnother.focus()
}