const eventos = require("../models").Evento;
const comunidades = require("../models").Comunidad;
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
            }else{
                eventos.findAll()
                .then(eventosEnvio=>{
                    res.status(200).send({eventosEnvio});
                })
                .catch(err=>{
                    res.status(500).send({message: "Ocurrió un error al buscar las eventos.", err:err});
                })
            }
        })
    }
}

function getEvents(req, res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
            }else{
                eventos.findAll({
                    where:{
                        nombreComunidad_FK:req.body.comunidad
                    }
                })
                .then(eventos=>{
                    res.status(200).send({eventos});
                })
                .catch(err=>{
                    res.status(500).send({message:'hubo un error buscando los eventos de la comunidad', err:err});
                })
            }
        })
    }
    
}

function createEvent(req,res){
    if(!req.headers.authorization){
        return res.status(403).send({message: "La petición no tiene la cabecera de autenticación."});
    }
    else{
        var token=req.headers.authorization.replace(/['"]+/g,'');
        var payload=nJwt.verify(token, secret,(err,verifiedJwt)=>{
            if(err){
            }else{
                eventos.create({
                    nombre:req.body.data.nombre,
                    descripcion:req.body.data.descripcion,
                    fecha:req.body.data.fecha,
                    hora:req.body.data.hora,
                    lugar:req.body.data.lugar,
                    nicknameCreador_FK:req.body.identidad.nickname,
                    nombreComunidad_FK:req.body.data.nombreComunidad
                })
                .then(event=>{
                    res.status(200).send({event});
                })
                .catch(err=>{
                    res.status(500).send({message:'ha habido hun herror hen hel hevento', err:err});
                })
            }
        })
    }
    
}

module.exports={
    getAll,
    getEvents,
    createEvent
}