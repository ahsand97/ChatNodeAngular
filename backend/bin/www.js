const http = require('http');
const app = require('../app');
const socketIO = require('socket.io');


const port = parseInt(process.env.port,10) || 8005;

app.set('port', port);

const server = http.createServer(app);

let socketio = socketIO(server);

socketio.on('connection', function(socket){
    console.log('Nueva instancia(cliente) de socket creada.')
    socket.on('disconnect', function() {
        console.log("disconnect: ", socket.id);
    });

    socket.on('usuario-conectado', function(cuerpo){
        console.log('conectado', cuerpo);
    });

    socket.on('usuario-desconectado', function(cuerpa){
        console.log('desconectado', cuerpa);
    });

    socket.on('nuevo-mensaje', function(cuerpo){
        console.log(cuerpo);
        //socketio.to(cuerpo.sala).emit('nuevo-mensaje', cuerpo);
        //console.log("envie",cuerpo);
        socketio.emit('nuevo-mensaje', cuerpo);
    });

    socket.on('nuevo-evento', function(cuerpo){
        console.log(cuerpo);
        //socketio.to(cuerpo.sala).emit('nuevo-mensaje', cuerpo);
        //console.log("envie",cuerpo);
        socket.broadcast.emit('nuevo-evento', cuerpo);
    });

    socket.on('nuevo-mensaje-privade', function(cuerpo){
        console.log(cuerpo);
        //socketio.to(cuerpo.sala).emit('nuevo-mensaje', cuerpo);
        //console.log("envie",cuerpo);
        socketio.emit('nuevo-mensaje-privade', cuerpo);
    });


    socket.on('join', function(sala){
        console.log("Se ha unido a la ", sala, socket.id);
        //socketio.in('Sala1').emit('nuevo-mensae', 'hola');
        socket.join(sala);
    });

    socket.on('leave', function(sala){
        console.log("Se ha salido de la ", sala, socket.id);
        //socketio.in('Sala1').emit('nuevo-mensae', 'hola');
        socket.leave(sala);
    });

});

server.listen(port); 