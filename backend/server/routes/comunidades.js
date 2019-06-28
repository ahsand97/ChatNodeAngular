const comunidadesController = require('../controllers').comunidades;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/comunidades', comunidadesController.getAll);
}