const mensajes_privadosController = require('../controllers').mensajes_privados;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/mensajesPrivados', mensajes_privadosController.getAll);
}