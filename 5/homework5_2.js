let currencyFrom;
let currencyTo;
$(function () {
    $('#convert').click(function () {
        currencyFrom = $('#sel1').val();
        currencyTo = $('#sel2').val();
        $.get(`https://api.exchangeratesapi.io/latest?base=${currencyFrom}`).then(res => {
            let rate = res['rates'][currencyTo];
            if (rate === undefined) {
                rate = 1;
            }
            let result = $('#input-number').val() * rate;
            $('#result').html('<em>' + result + '</em>');
        });
    });
});
