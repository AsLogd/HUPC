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

   socket.on('rotation', function(rot){
    console.log('Rotacion: ' + rot);
    socket.broadcast.emit("chat message", rot);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});