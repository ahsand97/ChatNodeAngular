const comunidades = require("../models").Comunidad;
const eventos = require("../models").Evento;
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
                comunidades.findAll()
                .then(comunidades=>{
                    let comunidadesEnvio=[];
                    for (let comunidad of comunidades){
                        comunidadCiclo={descripcion:comunidad.descripcion, nombre:comunidad.nombre};
                        comunidadesEnvio.push(comunidadCiclo);
                    }
                    res.status(200).send({comunidadesEnvio});
                })
                .catch(err=>{
                    res.status(500).send({message: "Ocurrió un error al buscar las comunidades."});
                })
            }
        })
    }
}

module.exports={
    getAll
}