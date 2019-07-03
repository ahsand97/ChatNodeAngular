const usuarios_comunidadesController = require('../controllers').usuarios_comunidades;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/usuario_comunidadesCrear', usuarios_comunidadesController.singupCommunity);
}