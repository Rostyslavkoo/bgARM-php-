function onlyNumber() {
    if (event.keyCode == 13) {
        event.returnValue = true;
    }
    else if (event.keyCode < 48 || event.keyCode > 57) {
        let date = Date().slice(16, 21);
        createToast('Bigupcase', date, 'В даному полі вводити можна тільки цифри')
        event.returnValue = false;

    }
}