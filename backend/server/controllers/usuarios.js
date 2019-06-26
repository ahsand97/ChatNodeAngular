const usuarios = require("../models").Usuario;
const jwt = require('../services/jwt');
const db = require('../models/index');

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
            var token = jwt.createToken(usuario);
            usuarioEnvio = {token: token, nickname: usuario.dataValues['nickname'], nombre: usuario.dataValues['nombre']}
            res.status(200).send({usuario: usuarioEnvio});
        }
        else{
            res.status(401).send({message: "Acceso no autorizado."});
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Ocurrió un error al buscar el usuario."});
    })
}

function logout(req,res){
    usuarios.findOne({
        where:{
            nickname: req.body.nickname
        }
    })
    .then(usuario=>{
        if(usuario){
            db.sequelize.query("UPDATE \"Usuarios\" SET \"estado\" = \'false\' WHERE \"nickname\" = " + "\'"+usuario.nickname+"\'");
            res.status(200).send({message: 'Sesion cerrada.'});
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
    getAll,
    logout
}