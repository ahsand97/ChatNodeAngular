const usuarios_comunidades = require("../models").Comunidad_Usuario;
const db = require('../models/index');


var config = require('../config/config');
var secret=config.token_secreto;
var nJwt = require('njwt');

function singupCommunity(req,res){
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
                usuarios_comunidades.create({
                    nicknameUsuario_FK:req.body.data.nickname,
                    nombreComunidad_FK:req.body.data.comunidad
                })
                .then(user_community=>{
                    res.status(200).send({user_community});
                })
                .catch(err=>{
                    res.status(500).send({message:'ha habido hun herror hen hel huser_community', err:err});
                })
            }
        })
    }
    
}

module.exports={
    singupCommunity
}