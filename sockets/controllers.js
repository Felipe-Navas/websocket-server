
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('enviar-mensaje-cliente', ( payload, callback ) => {

        const id = 123456;

        // Asi llamo al callback que envio el cliente al servidor
        callback( id );

        // Emito este evento hacia el cliente
        socket.broadcast.emit('enviar-mensaje-servidor', payload);
    });
};


module.exports = {
    socketController,
};
