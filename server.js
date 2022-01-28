const express = require('express');
const app = express();
const QRCode = require('qrcode');
const server = require('http').createServer(app);
const Salle = require('./server/models/salleModel.js');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });
//const io = require('socket.io')(server);
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const router = express.Router();
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const port = process.env.PORT || 5001;
const url = 'mongodb://localhost/test';
const routes = require('./server/routes/routes');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const connection = mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
}).on('error', (error) => {
    console.log('error is :' + error);
});
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
wss.on('connection', function connection(ws) {
    console.log('connection');
    ws.on('message', function incoming(message) {
        console.log('%s', message)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message + "");
            }
        })
    })
})
server.listen(port, () => {
    console.log("server is running on port " + port + "....");
})

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