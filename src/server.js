const config = require('../config.js');
const express = require('express');
const app = express();
const routerProductos = require('./rutas/router_productos');
const routerCarritos = require('./rutas/router_carrito');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

// rutas
app.use('/api', routerProductos);
app.use('/api', routerCarritos);

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(config.port, () => {
    console.log(`server listening on http://localhost:${config.port}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.error('error on the server:', error);
});

module.exports = server;