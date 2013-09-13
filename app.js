// require modules
var express = require('express')
  , sio = require('socket.io')
  , dgram = require('dgram');

// create UDP socket
var scratch_con = dgram.createSocket('udp4');

// create server
var app = module.exports = express();

// prepare app and socket.io
var io = sio.listen(app.listen(3000));

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/view');
  app.set('view engine', 'jade');
});

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

io.sockets.on('connection', function (socket) {
  socket.on('point-update', function (p) {
    console.log(p);
    var message = 'sensor-update'
                + ' "ax" ' + p.ax
                + ' "ay" ' + p.ay
                + ' "rx" ' + p.rx
                + ' "ry" ' + p.ry;

    var packet = new Buffer(message);
    scratch_con.send(packet, 0, packet.length, 42001, '127.0.0.1', function(){});
  });

  socket.on('broadcast', function(ctx){
    var message = 'broadcast "' + ctx + '"';
    var packet = new Buffer(message);
    scratch_con.send(packet, 0, packet.length, 42001, '127.0.0.1', function(){});
  });
});

