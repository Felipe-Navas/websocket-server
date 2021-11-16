const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    };

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
    };

    routes() {
      //  this.app.use( this.paths.uploads, require('../routes/uploads'));
    };

    sockets() {
        this.io.on("connection", socket => {
            // console.log('Cliente conectado', socket.id );
            socket.on('disconnect', () => {
                // console.log('Cliente desconectado', socket.id );
            });

            socket.on('enviar-mensaje-cliente', ( payload, callback ) => {

                const id = 123456;

                // Asi llamo al callback que envio el cliente al servidor
                callback( id );

                // Emito este evento hacia el cliente
                this.io.emit('enviar-mensaje-servidor', payload);
            });
        });
    };

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    };
};


module.exports = Server;