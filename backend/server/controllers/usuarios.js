const usuarios = require("../models").Usuario;
const jwt = require('../services/jwt');

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
            usuario.estado = true;
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