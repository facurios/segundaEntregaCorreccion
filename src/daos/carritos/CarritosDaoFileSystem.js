const config = require('../../../config');
const ContenedorFileSystem = require('../../contenedores/contenedorFileSystem');

class CarritosDaoFileSystem extends ContenedorFileSystem {
    constructor() {
        super(`${config.database.uri}/carts/carts.txt`);
    }
}

module.exports = new CarritosDaoFileSystem(config.database.uri);