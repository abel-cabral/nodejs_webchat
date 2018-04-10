//1º Importar as configurações do servidor
var app = require('./config/server');

//2º Parametrizar a porta de escuta
app.listen(80, function(){
    console.log('Servidor Online');
})