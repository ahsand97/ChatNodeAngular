const usuariosController = require('../controllers').usuarios;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/usuario', usuariosController.crear_usuario);
    app.post('/api/login', usuariosController.login);
    app.post('/api/logout', usuariosController.logout);
    app.post('/api/refresh', usuariosController.newToken);
    app.post('/api/usuarios', usuariosController.getAll);
    app.post('/api/changeroom', usuariosController.changeRoom);
    app.post('/api/deleteAccount', usuariosController.deleteAccount);
    app.post('/api/communitiesUser', usuariosController.comunitiesUser);
    app.post('/api/changeUbicacion', usuariosController.changeUbicacion);
}