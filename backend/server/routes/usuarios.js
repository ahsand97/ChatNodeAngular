const usuariosController = require('../controllers').usuarios;
const md_auth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/usuario', usuariosController.crear_usuario);
    app.post('/api/login', usuariosController.login);
    app.post('/api/logout', usuariosController.logout);
    app.get('/api/usuarios', md_auth.auth, usuariosController.getAll);
}