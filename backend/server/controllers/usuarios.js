const usuarios = require("../models").Usuario;
const jwt = require('../services/jwt');

function crear_usuario(req,res){
    usuarios.create(req.body)
    .then(usuario=>{
        res.status(200).send({usuario});
    })
    .catch(err=>{
        res.status(500).send({err});
    })
}

function login(req,res){
    usuarios.findOne({
        where:{
            nickname: req.body.usuario.nickname,
            password: req.body.usuario.password
        }
    })
    .then(usuario=>{
        if(usuario){
            if(req.body.token){
                res.status(200).send({token: jwt.createToken(usuario)});
            }else{
                res.status(200).send({usuario: usuario});
            }
        }else{
            res.status(401).send({message: "Acceso no autorizado."});
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Ocurrió un error al buscar el usuario."});
    })
}

function getAll(req,res){
    usuarios.findAll()
    .then(usuarios=>{
        res.status(200).send({usuarios});
    })
    .catch(err=>{
        res.status(500).send({message: "Ocurrió un error al buscar los usuarios."});
    })
}

module.exports={
    crear_usuario,
    login,
    getAll
}