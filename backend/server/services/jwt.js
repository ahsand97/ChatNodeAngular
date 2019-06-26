var nJwt = require('njwt');
var randtoken = require('rand-token');

var config = require('../config/config');
var secret=config.token_secreto;

exports.createToken=(usuario, estado)=>{
    var params={
        usuario_autorizado: usuario.nickname
    }
    if (estado == false){
        var jwt=nJwt.create(params,secret);
        var t = new Date();
        t.setMinutes(t.getMinutes()+30);
        //t.setSeconds(t.getSeconds()+3);
        jwt.setExpiration(t);
        var token = jwt.compact();
        return token;
    }
    else{
        var jwt=nJwt.create(params,secret);
        //var jwt=nJwt.create(params+randtoken.uid(16),secret); 
        var t = new Date();
        t.setMinutes(t.getMinutes()+30);
        //t.setSeconds(t.getSeconds()+3);
        jwt.setExpiration(t);
        var token = jwt.compact();
        return token;
    }
    
}

