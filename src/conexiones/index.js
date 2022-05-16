const config = require('../../config.js');

let cliente;
(async function() {
    switch (config.database.engine) {
        case 'mongodb':
            cliente = require('./clienteMongoDB');
            await cliente.connect();
            break;
        case 'fileSystem,':
            cliente = require('./fileSystem');
            break;
        default:
            //cliente = clienteMongoDB;
    }
})();

module.exports = cliente;