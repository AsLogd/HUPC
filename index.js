var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/receiver', function(req, res){
  res.sendFile(__dirname + '/receiver.html');
});

app.get('/sender', function(req, res){
  res.sendFile(__dirname + '/sender.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('chat message', function(msg){
    console.log('Recibido: ' + msg);
    socket.broadcast.emit("chat message", msg);
  });

   socket.on('rotation', function(o){
    console.log('Rotacion: (x:' + o.beta + ',y:' + o.gamma + ',z:' + o.alpha);
    socket.broadcast.emit("rotation", o);
  });

  socket.on('move', function(o){
    socket.broadcast.emit("move",o);
  });
  /*
  socket.on('moving_up', function(o){
    socket.broadcast.emit("moving_up");
  });
  socket.on('moving_left', function(o){
    socket.broadcast.emit("moving_left");
  });
  socket.on('moving_right', function(o){
    socket.broadcast.emit("moving_right");
  });
  socket.on('moving_down', function(o){
    socket.broadcast.emit("moving_down");
  });
  socket.on('stop_moving', function(o){
    socket.broadcast.emit("stop_moving");
  });*/
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});