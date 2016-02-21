var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/menu.html');
});

app.get('/display', function(req, res){
  res.sendFile(__dirname + '/display.html');
});

app.get('/vhand', function(req, res){
  res.sendFile(__dirname + '/vhand.html');
});

app.get('/move', function(req, res){
  res.sendFile(__dirname + '/move.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

   socket.on('rotation', function(o){
    //console.log('Rotacion: (x:' + o.beta + ',y:' + o.gamma + ',z:' + o.alpha);
    socket.broadcast.emit("rotation", o);
  });

   socket.on('move', function(moveVector){
    console.log('Recibido: move');
    socket.broadcast.emit("move", moveVector);
  });
   socket.on('pick', function(){
    console.log('Recibido: pick');
    socket.broadcast.emit("pick");
  });
   socket.on('drop', function(){
    console.log('Recibido: drop');
    socket.broadcast.emit("drop");
  });
   socket.on('throw', function(obj){
    console.log('Recibido: ' + obj.force + ", " + obj.time);
    socket.broadcast.emit("throw");
  });

   socket.on('screenTapped', function(istapped){
    //console.log('Recibido: ' + msg);
    socket.broadcast.emit("screenTapped", istapped);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});