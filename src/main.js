// Iniciar conexion con base de datos
const clienteDB = require('./conexiones/index');

// Iniciar servidor
const server = require('./server');

// graceful shutdown
function gracefulShutdown() {
    clienteDB.close()
        .then(() => {
            console.info('Thanks for using this server, goodbye :)');
        })
        .catch(error => {
            console.error('There was an error shutting down the server, ' + error);
        });
}
process.on('exit', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', gracefulShutdown);