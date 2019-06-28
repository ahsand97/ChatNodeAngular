const eventosController = require('../controllers').eventos;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/eventos', eventosController.getAll);
    app.post('/api/eventosDeComunidad', eventosController.getEvents);
    app.post('/api/eventosCrear', eventosController.createEvent);
}