const mensajes_privados = require("../models").Mensaje_Privado;
const usuarios = require("../models").Usuario;

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
                        nickname: req.body.origen
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
                mensajes_privados.findAll({
                    where:{
                        id_ConversacionFK: req.body.conversacion.idConversacion_FK
                    }
                })
                .then(mensajes=>{
                    let mensajesEnvio=[];
                    for (let mensaje of mensajes){
                        mensajeciclo={emisor:mensaje.emisor, receptor:mensaje.receptor, body: mensaje.body, fecha_hora: mensaje.fecha_hora, id_ConversacionFK: mensaje.id_ConversacionFK};
                        mensajesEnvio.push(mensajeciclo);
                    }
                    res.status(200).send({mensajesEnvio});
                })
                .catch(error=>{
                    res.status(500).send({message: "Ocurrió un error al buscar los mensajes privados."});
                })
            }
        })
    }
}

module.exports={
    getAll
}