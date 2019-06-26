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

    socket.on('nuevo-mensaje', function(cuerpo){
        console.log(cuerpo);
        //socketio.in('Sala1').emit('nuevo-mensae', 'hola');
        socketio.emit('nuevo-mensaje', cuerpo);
    })
});

server.listen(port); 