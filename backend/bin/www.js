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
        socketio.emit('usuario-conectado', cuerpo);
        console.log('conectado', cuerpo);
    });

    socket.on('usuario-desconectado', function(cuerpa){
        socketio.emit('usuario-desconectado', cuerpa);
        console.log('desconectado', cuerpa);
    });

    socket.on('nuevo-usuario-login', function(cuerpa){
        socketio.emit('nuevo-usuario-login', cuerpa);
        console.log('nuevo-usuario-login', cuerpa);
    });

    socket.on('nuevo-usuario-logout', function(cuerpa){
        socketio.emit('nuevo-usuario-logout', cuerpa);
        console.log('nuevo-usuario-logout', cuerpa);
    });

    socket.on('nuevo-usuario-sistema', function(cuerpa){
        socketio.emit('nuevo-usuario-sistema', cuerpa);
        //console.log('nuevo-usuario-sistema', cuerpa);
    });

    socket.on('elimino-usuario-sistema', function(cuerpa){
        socketio.emit('elimino-usuario-sistema', cuerpa);
        //console.log('elimino-usuario-sistema', cuerpa);
    });

    socket.on('nueva-conversacion', function(cuerpa){
        socketio.emit('nueva-conversacion', cuerpa);
        console.log('nueva-conversacion', cuerpa);
    });

    socket.on('nuevo-mensaje', function(cuerpo){
        let today = new Date();
        let time = (today.getHours()<10?'0':'') + today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() + ":" + (today.getSeconds()<10?'0':'') + today.getSeconds();
        cuerpo['time']=time
        socketio.emit('nuevo-mensaje', cuerpo);
    });

    socket.on('nuevo-evento', function(comunidad, cuerpo){
        console.log(cuerpo, comunidad);
        //socketio.in(comunidad).emit('nuevo-evento', cuerpo);
        socket.to(comunidad).emit('nuevo-evento', cuerpo);
    });

    socket.on('join-into-community', function(comunidad){
        socket.join(comunidad);
    })

    socket.on('nuevo-mensaje-privado', function(cuerpo){
        console.log('nuevo-mensaje-privado',cuerpo);
        let today = new Date();
        let time =  (today.getDate()<10?'0':'') + today.getDate() + "/" + (today.getMonth()<10?'0':'')+ + (today.getMonth()+1) + "/" + today.getFullYear() + " " + (today.getHours()<10?'0':'') + today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() + ":" + (today.getSeconds()<10?'0':'') + today.getSeconds();
        cuerpo['fecha_hora']=time
        socketio.in(cuerpo.emisor+cuerpo.receptor).emit('nuevo-mensaje-privado', cuerpo);
        socketio.in(cuerpo.emisor+cuerpo.receptor).clients((error, clients) => {
            //console.log('tamaño', clients.length)
            if (error) throw error;
            if (clients.length == 1){
                //console.log("------notificar al otro-----------");
                //socketio.emit('nueva-notificacion-mensaje-privado', cuerpo);
            } // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
          });
        //socketio.emit('nuevo-mensaje-privado', cuerpo);
    });

    socket.on('nuevo-mensaje-privado-cargar', function(cuerpo){
        //console.log('nuevo-mensaje-privado-cargar',cuerpo);
        socketio.in(cuerpo.emisor+cuerpo.receptor).emit('nuevo-mensaje-privado-cargar', cuerpo);
        //socketio.emit('nuevo-mensaje-privado', cuerpo);
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