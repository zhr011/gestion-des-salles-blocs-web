"use strict";

var express = require('express');

var app = express();

var QRCode = require('qrcode');

var server = require('http').createServer(app);

var Salle = require('./server/models/salleModel.js');

var WebSocket = require('ws');

var wss = new WebSocket.Server({
  server: server
}); //const io = require('socket.io')(server);

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var router = express.Router();

var exphbs = require('express-handlebars');

var hbs = require('hbs');

var port = process.env.PORT || 5001;
var url = 'mongodb://localhost/test';

var routes = require('./server/routes/routes');

var mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});
var connection = mongoose.connection.once('open', function () {
  console.log('connected to MongoDB');
}).on('error', function (error) {
  console.log('error is :' + error);
});
app.set('view engine', 'hbs');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
wss.on('connection', function connection(ws) {
  console.log('connection');
  ws.on('message', function incoming(message) {
    console.log('%s', message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message + "");
      }
    });
  });
});
server.listen(port, function () {
  console.log("server is running on port " + port + "....");
});
/*io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('inserted', (inserted) => {
        const data = inserted.split(',');
        socket.broadcast.emit("inserted", data);
    });
    socket.on("hey", (hey) => {
        console.log(hey);
    })
    socket.on("data", async(data) => {
        const salle = await Salle.findOne().sort({ "id": -1 }).limit(1);
        id = salle.id
        const sallem = {
            id: id + 1,
            name: data.name,
            bloc: data.bloc
        }
        let stringdata = JSON.stringify(sallem)
        QRCode.toDataURL(stringdata, (err, code) => {
            info = {
                id: sallem.id,
                name: sallem.name,
                bloc: sallem.bloc,
                qrcode: code
            }
            socket.broadcast.emit("info", info)
        })
    })

})*/