// Servidor de Express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')

const Sockets = require('./sockets')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        // HTTP server
        this.server = http.createServer(this.app)

        
        // Configuracion del socket server
        this.io = socketio(this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }})


    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')))

        //Habilitar CORS (esto NO funciona para sockets)
        this.app.use( cors() );
    }

    configurarSockets() {
        new Sockets(this.io)
    }

    execute() {
        
        // Inicializar middlewares
        this.middlewares()

        // Inicializar sockets
        this.configurarSockets();

        // inicializar server
        this.server.listen(this.port ,() => {
            console.log('Servidor corriendo en puerto:', this.port)
        });
    }

}

module.exports = Server