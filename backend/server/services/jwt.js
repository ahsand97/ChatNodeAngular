var nJwt = require('njwt');
var config = require('../config/config');
var secret=config.token_secreto;

exports.createToken=(usuario)=>{
    var params={
        usuario_autorizado: usuario.nickname
    }

    var jwt=nJwt.create(params,secret);

    var t = new Date();
    t.setHours(t.getHours()+2);
    jwt.setExpiration(t);

    var token = jwt.compact();

    return token;
}

