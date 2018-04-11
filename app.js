//1º Importar as configurações do servidor
var app = require('./config/server');

//Porta Padrão do Heroku
var porta = process.env.PORT || 80;

//2º Parametrizar a porta de escuta respondemos usando http
var server = app.listen(porta, function () { //Encapsulamos para passar essa porta para o socket.io
    console.log('Servidor Online');
})

//Assim podemos usar a mesma porta para tanto requisições http quanto as do socket.io

//Chamamos nosso módulos e o fazemos ouvir o mesmo de 'server'
var io = require('socket.io').listen(server); //Agora ouvimos requisições de ambos os tipos


//------------------------------------------------------------------------------------------------------------CRIA A CONEXÃO VIA WEB SOCKET
app.set('io', io); //usando o set, adicionamos uma variavel global ao app, assim poderemos chamar ele pelo app em qualquer ponto.
//on('nome' funcaoDeCallback(){}); Ouve a requisição
//emit('nome', {podemos passar por aqui qualquer outra função de dados}); Responde essa requisição, ou seja, aonde nome for escutado executamos uma função de callback
//Connect - O evento 'connection' é um evento padrao que procura por eventos de tentativa de conexao no lado do cliente
io.on('connection', function (socket) { //Passamos uma função com o objeto da conexão em sim, e dentro dela podemos trabalhar com seus eventos.

            //Disconect
            socket.on('disconnect', function () {
                console.log('Desconectado');
            });


            //---------------------------------------------------------------------------------------------------------Captura e responde cliente            
            //Devolveremos a mensagem só pra tela do usuario que enviou
            socket.on('msgParaServidor', function (data) { //Dados recebidos neste ouvir

                //--------------------------------------------------------------TROCA DE MENSAGENS
                socket.emit(
                    'msgParaCliente', //Nome da variavel gatilho no front
                    {
                        status: data.mensagem,
                        apelido: data.apelido
                    } //valores
                ) //recebemos a mensagem e enviamos de volta pra sala

                //Para enviar a mensagem para todos usaremos um módulo Broadcast, ele envia pra todos menos pra vc.
                socket.broadcast.emit(
                    'msgParaCliente', //Nome da variavel gatilho no front
                    {
                        status: data.mensagem,
                        apelido: data.apelido
                    } //valores
                ) //recebemos a mensagem e enviamos de volta pra sala
                //--------------------------------------------------------------FIM TROCA DE MENSAGENS

                //--------------------------------------------------------------USUARIOS ONLINE
                //Dados recebidos neste ouvir
                socket.emit(
                    'online_users', //Nome da variavel gatilho no front
                    {
                        apelido: data.apelido
                    } //valores
                ) //recebemos a mensagem e enviamos de volta pra sala

                //Para enviar a mensagem para todos usaremos um módulo Broadcast, ele envia pra todos menos pra vc.
                socket.broadcast.emit(
                    'online_users', //Nome da variavel gatilho no front
                    {
                        apelido: data.apelido
                    } //valores
                ) //recebemos a mensagem e enviamos de volta pra sala   
                //Devolveremos a mensagem só pra tela do usuario que enviou
                //--------------------------------------------------------------FIM USUARIOS ONLINE
            });
            //Portanto dentro da nossa função connect chamamos varias outras funções 
            //passando para tarefas pré determinadas.
        });
        //------------------------------------------------------------------------------------------------------------FIM CRIA A CONEXÃO VIA WEB SOCKET

            