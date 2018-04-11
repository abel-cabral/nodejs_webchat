module.exports.iniciaChat = function(application, req, res){
    var dados_form = req.body;//Captura dos campos do form
    
    //('chave', 'mensagem')
    req.assert('apelido', 'Qual seu apelido?').notEmpty();//validação dos dados, já posso informar direto quais os campos que estou tratando, ou passar uma raiavel com eles
    req.assert('apelido', 'Deve ter de 3 a 15 caracteres.').len(3,15);

    //Variavel que recebe erros;
    var erros = req.validationErrors();
    
    //Precisamos retornar os erros, caso o required esteja configurado adquadamente nao precisamos
    if(erros){
        res.render('index', {validacao:erros});
        return //o 'res.send' encerra a função, mas caso nao usemos ele teremos que parar usando 'return'
    }

    //para consumir a variavel global, chamamos o parametro equivalente a 'app' e usamos um get para puxar suas propriedades
    application.get('io').emit(
        'msgParaCliente',//variavel
        {
            status: 'Entrou na Sala',
            apelido: dados_form.apelido
        }//valores
    );
    
    //Nenhum erro encontrado, autorizado!
    res.render('chat', {apelido : dados_form });//'send' envia uma mensagem de volta, 'render' carrega uma nova janela e podemos enviar um json
}