module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controller.index.index(application, req, res);//navegamos pelo express usando o application e ao abrirmos o js executamos a funçaõ e com seus parametros
    })

    application.get('/index', function (req, res) {
        application.app.controller.index.index(application, req, res);//navegamos pelo express usando o application e ao abrirmos o js executamos a funçaõ e com seus parametros
    })

    application.get('/home', function (req, res) {
        application.app.controller.index.index(application, req, res);//navegamos pelo express usando o application e ao abrirmos o js executamos a funçaõ e com seus parametros
    })
}