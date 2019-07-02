const usuarios_conversacionesController = require('../controllers').usuarios_conversaciones;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/conversaciones', usuarios_conversacionesController.getAll);
}