$('.autoriseBtn').click(function(e) {
    e.preventDefault();
    let password = $('input[name="autoriseCod"]').val();
    if (password == ``) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'Введіть пароль')
        return false;
    }
    $.ajax({
        url: 'php-content/autorise.php',
        type: 'POST',
        dataType: 'json',
        data: {
            autoriseCod: password
        },
        beforeSend: function() {
            $('#loaderAutoriseBtn').css('display', 'inline-block');
            $('.autoriseBtn').prop('disabled', true);
        },
        success: function(response) {
            console.log(response)
            if (!response.status == true) {
                $('#wrong-pass-text').text("Неправильний пароль");
                WrongPass();
                $('#loaderAutoriseBtn').css('display', 'none');
                $('.autoriseBtn').prop('disabled', false);
            } else {
                
                
                
     
                document.location.href='main-add-good.php'
                WrongPassRemove()
                $('#wrong-pass-text').text("");
                $('#loaderAutoriseBtn').css('display', 'none');
                $('.autoriseBtn').prop('disabled', false);
            }
        }
    })
})

function WrongPass() {
    document.forms['login-form'].classList.add('wrong-pass');
}

function WrongPassRemove() {
    document.forms['login-form'].classList.remove('wrong-pass');
}