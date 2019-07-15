const usuarios = require("../models").Usuario;
const usuarios_comunidades = require("../models").Comunidad_Usuario;

const jwt = require('../services/jwt');
const db = require('../models/index');

var config = require('../config/config');
var secret=config.token_secreto;
var nJwt = require('njwt');

function crear_usuario(req,res){
    usuarios.findOne({
        where:{
            nickname: req.body.nickname,
        }
    })
    .then(usuario=>{
        if(usuario){
            res.status(401).send({id:'1', message: "Ya existe un usuario con el nickname ingresado."});
        }
        else{
            usuarios.create(req.body)
            .then(usuario=>{
                res.status(200).send({usuario});
            })
            .catch(err=>{
                res.status(500).send({id:'2', message: "Ocurrió un error al registrar el usuario."});
            })
        }
    })
    .catch(err=>{
        res.status(500).send({id: '2', message: "Ocurrió un error al registrar el usuario."});
    })
}

function login(req,res){
    usuarios.findOne({
        where:{
            nickname: req.body.nickname,
            password: req.body.password
        }
    })
    .then(usuario=>{
        if(usuario){
            db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'true\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
            db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'Sala 1\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
            var token = jwt.createToken(usuario, false);
            usuarioEnvio = {token: token, nickname: usuario.dataValues['nickname'], nombre: usuario.dataValues['nombre'], ubicacion: usuario.dataValues['ubicacion']}
            res.status(200).send(usuarioEnvio);
        }
        else{
            res.status(401).send({message: "Acceso no autorizado."});
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Ocurrió un error al buscar el usuario."});
    })
}

function getAll(req,res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                    }
                    else{
                        res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                if(req.body.sala){
                    usuarios.findAll({
                        where:{
                            nombre_sala_FK: req.body.sala,
                            estado: true
                        }
                    })
                    .then(usuarios=>{
                        let usuariosEnvio=[];
                        for (let usuario of usuarios){
                            usuarioCiclo={nickname:usuario.nickname, nombre:usuario.nombre, estado:usuario.estado};
                            usuariosEnvio.push(usuarioCiclo);
                        }
                        res.status(200).send({usuariosEnvio});
                    })
                    .catch(err=>{
                        res.status(500).send({message: "Ocurrió un error al buscar los usuarios."});
                    })
                }
                else{
                    usuarios.findAll()
                    .then(usuarios=>{
                        let usuariosEnvio=[];
                        for (let usuario of usuarios){
                            usuarioCiclo={nickname:usuario.nickname, nombre:usuario.nombre, estado:usuario.estado};
                            usuariosEnvio.push(usuarioCiclo);
                        }

                        res.status(200).send({usuariosEnvio});
                    })
                    .catch(err=>{
                        res.status(500).send({message: "Ocurrió un error al buscar los usuarios."});
                    })
                }
                
            }
        })
    }
}

function changeRoom(req,res){
    console.log('cambioSala');  
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                    }
                    else{
                        res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = '"+req.body.sala+"' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        return res.status(200).send({message:'Sala cambiada.'});
                    }
                    return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
            }
        })
    }
}


function logout(req,res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{  
        usuarios.findOne({
            where:{
                nickname: req.body.nickname
            }
        })
        .then(usuario=>{
            if(usuario){
                db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                return res.status(200).send({message:'Sesión finalizada.'});
            }
        })
        .catch(err=>{
            res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
            })
        }
    }

function newToken(req, res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                    }
                    else{
                        return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                var newtoken = jwt.createToken(req.body.nickname, true);
                usuarioEnvio = {nuevotoken: newtoken, nickname: req.body.nickname, nombre: req.body.nombre, ubicacion: req.body.ubicacion}
                res.status(200).send(usuarioEnvio);
            }
        })
    }
}

function deleteAccount(req, res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                    }
                    else{
                        return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        usuarios.destroy({
                            where:{
                                nickname:usuario.nickname
                            }
                        })
                        .then(function(){
                            res.status(200).send({mensaje: 'Cuenta eliminada.'});
                        })
                        .catch(function(error){
                            console.log(error)
                            res.status(500).send({mensaje: 'Error al eliminar la cuenta.'})
                        })
                    }
                    else{
                        return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
            }
        })
    }
}

function comunitiesUser(req,res){
    console.log(req.body);
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'SalaNull\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                    }
                    else{
                        return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                    }
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                usuarios_comunidades.findAll({
                    where:{
                        nicknameUsuario_FK: req.body.nickname
                    },attributes:[
                        'nombreComunidad_FK'
                    ]
                })
                .then(communidades=>{
                    let comms = [];
                    communidades.forEach(element => {
                        comms.push(element.nombreComunidad_FK);
                    });
                    res.status(200).send({comms});
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario.", err:err});
                })
                
            }
        })
    }
}

module.exports={
    crear_usuario,
    login,
    getAll,
    logout,
    newToken,
    changeRoom,
    deleteAccount, 
    comunitiesUser
}