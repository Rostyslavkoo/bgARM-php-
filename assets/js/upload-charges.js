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

uploadBtn.addEventListener('click' , () => {
	if(idNewChargeValue.value == "")
	{
		alert("Введіть код товару")
		return false;
	}else if(typeCharge.value == "")
	{
		alert("Введіть тип зарядки")
		return false;
	}else if(brandCharge.value == "")
	{
		alert("Введіть бренд зарядки")
		return false;
	}else if(connector.value == "")
	{
		alert("Введіть роз'єм")
		return false;
	}else if(colorCharge.value == "")
	{
		alert("Введіть колір зарядки")
		return false;
	}else if(length.value == "")
	{
		alert("Введіть довжину зарядки")
		return false;
	}else if(firstPriceCharge.value == "")
	{
		alert("Введіть початкову ціну зарядки")
		return false;
	}else if(new_charge_img.value == "")
	{
		alert("Завантажте зображення до зарядки")
		return false;
	}else if(quantityNewCharge.value == "" || quantityNewCharge.value == 0)
	{
		alert("Вкажіть кількість зарядкок")
		return false;
	}else if(lastPriceCharge.value == "")
	{
		alert("Вкажіть ціну продажу зарядки")
		return false;
	}

	$.ajax({
		url:'php-content/upload-new-charges.php',
		type:'POST',
		cache:false,
		data:{'idNewChargeValue':idNewChargeValue.value, 'typeCharge':typeCharge.value, 'brandCharge':brandCharge.value, 'connector':connector.value, 'colorCharge':colorCharge.value, 'length':length.value, 'firstPriceCharge':firstPriceCharge.value ,'quantityNewCharge':quantityNewCharge.value, 'lastPriceCharge':lastPriceCharge.value},
		dataType:'html',
		beforeSend: function(){
			uploadBtn.setAttribute("disabled", true);
		},
		success: function(data){
			if(!data){
				alert("Помилка");
			}
			else{
				$("#uploadNewChargeForm").trigger("reset");
				uploadBtn.removeAttribute('disabled')
			}
		},
	});
})