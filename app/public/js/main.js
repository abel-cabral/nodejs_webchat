$(document).ready(function () {

    //Conta as Entradas de login e desbloqueia o botão após 3 caracteres
    $('#apelido').keypress(function () {
        if ($('#apelido').val().length > 3) {
            $("#entrar").prop("disabled", false);
        } else {
            $("#entrar").prop("disabled", true);
        }
    })
    //Fim
});