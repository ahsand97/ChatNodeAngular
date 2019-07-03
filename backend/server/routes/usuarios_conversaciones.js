const usuarios_conversacionesController = require('../controllers').usuarios_conversaciones;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/conversaciones', usuarios_conversacionesController.getAll);
    app.post('/api/sendMensaje', usuarios_conversacionesController.sendMessage);
    app.post('/api/sendConversacion', usuarios_conversacionesController.sendConversacion);
}