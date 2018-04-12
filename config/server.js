//1º Importar o módulo framework Express
var express = require('express');

//2º Importar o módulo do consign
var consign = require('consign');

//3º Importar o módulo do body-parser
var bodyParser = require('body-parser');

//4º Importar o módulo do express-validator
var expressVal = require('express-validator');

//5º Iniciar o objeto do express
var app = express();

//6ª Configuramos no view engine, setamos as variaveis 'view ejs' e 'views' do express
app.set('view engine', 'ejs');//Informo qual engine vai ser usado pra processamento, no caso o EJS
app.set('views', 'app/views');//setamos onde esta nossas views EJS

//--------------------------------MIDDLEWARE
//7º Configurar middleware express.static
app.use(express.static('app/public'));//Facilita a comunicação com nossos arquivos no front
//8º Configurar middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));//quando houver um post de um formulario, recuperamos os dados via json
//8º Configurar middleware express-validator
app.use(expressVal());//iniciamos a função que vai validar nossos campos submetidos
//FIM-----------------------------MIDDLEWARE

consign()//Faz o autoloader das rotas, das views e dos controllers
.include('app/routes')//Informamos onde esta nossas rotas
.then('app/controller')//O mesmo para rota, mas usando 'Then' pois estamos acrecentando no include acima
.into(app)//Por fim informamamos que todos os objetos carregados pelo consign vao ser inseridos em 'var app'


//Por ultimo exportamos o onj app contendo tudo a ele anexado.
module.exports = app;