const usuarios = require("../models").Usuario;
const conversaciones = require("../models").Conversacion;
const usuarios_conversaciones=  require("../models").Usuario_Conversacion;
const mensajes_privados = require("../models").Mensaje_Privado;

const Op = require('Sequelize').Op;

const jwt = require('../services/jwt');
const db = require('../models/index');

var config = require('../config/config');
var secret=config.token_secreto;
var nJwt = require('njwt');

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
                    return res.status(401).send({id: '1', message: "Acceso no autorizado."});
                })
                .catch(err=>{
                    res.status(500).send({id: '2', message: "Ocurrió un error al buscar el usuario."});
                })
                return res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                usuarios_conversaciones.findAll({
                    where:{
                        [Op.or]:[
                            {nicknameUsuario1_FK: req.body.nickname},
                            {nicknameUsuario2_FK: req.body.nickname}
                        ]
                    }
                })
                .then(respuesta=>{
                    let usuariosConversacionesEnvio=[];
                    for (let usuarioConversacion of respuesta){
                        usuarioConversacionCiclo={nicknameUsuario1_FK:usuarioConversacion.nicknameUsuario1_FK, nicknameUsuario2_FK:usuarioConversacion.nicknameUsuario2_FK, idConversacion_FK: usuarioConversacion.idConversacion_FK};
                        usuariosConversacionesEnvio.push(usuarioConversacionCiclo);
                    }
                    res.status(200).send({usuariosConversacionesEnvio});
                })
                .catch(err=>{
                    res.status(500).send({message: "Ocurrió un error al buscar las conversaciones."});
                })
            }
        })
    }
}

function sendMessage(req,res){
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
                res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                mensajes_privados.create({
                    emisor: req.body.emisor,
                    receptor: req.body.receptor,
                    body: req.body.body,
                    fecha_hora: req.body.fecha_hora,
                    id_ConversacionFK: req.body.idConversacion_FK
                    
                })
                .then(respuesta=>{
                    res.status(200).send({exito:respuesta});
                })
                .catch(error=>{
                    res.status(500).send({error: error});
                })
            }
        })
    }
}

function sendConversacion(req, res){
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
                res.status(401).send({id: '1', message: "Acceso no autorizado."});
            }else{
                conversaciones.create({
                    usuario_1: req.body.usuario1,
                    usuario_2: req.body.usuario2
                })
                .then(respuesta=>{
                    usuarios_conversaciones.create({
                        nicknameUsuario1_FK: respuesta.usuario_1,
                        nicknameUsuario2_FK: respuesta.usuario_2,
                        idConversacion_FK: respuesta.id_Conversacion
                    })
                    .then(respuesta2=>{
                        res.status(200).send(respuesta2);
                    })
                    .catch(error=>{
                        res.status(500).send({error: error});
                    })
                })
                .catch(error=>{
                    res.status(500).send({error: error});
                })
            }
        })
    }
}

module.exports={
    getAll,
    sendMessage,
    sendConversacion
}