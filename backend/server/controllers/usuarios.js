const usuarios = require("../models").Usuario;
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
            var token = jwt.createToken(usuario, false);
            usuarioEnvio = {token: token, nickname: usuario.dataValues['nickname'], nombre: usuario.dataValues['nombre']}
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
                            usuarioCiclo={nickname:usuario.nickname, nombre:usuario.nombre};
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
                            usuarioCiclo={nickname:usuario.nickname, nombre:usuario.nombre};
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
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
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
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
            }else{
                usuarios.findOne({
                    where:{
                        nickname: req.body.nickname
                    }
                })
                .then(usuario=>{
                    if(usuario){
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        db.sequelize.query("UPDATE \"Usuarios\" SET \"nombre_sala_FK\" = \'Sala 1\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
                        return res.status(200).send({message:'Sesión finalizada.'});
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
                    }
                    return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
            }else{
                var newtoken = jwt.createToken(req.body.nickname, true);
                usuarioEnvio = {nuevotoken: newtoken, nickname: req.body.nickname, nombre: req.body.nombre}
                res.status(200).send(usuarioEnvio);
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
    changeRoom
}