const config = require('../../../config');
const ContenedorFileSystem = require('../../contenedores/contenedorFileSystem');

class ProductosDaoFileSystem extends ContenedorFileSystem {
    constructor() {
        super(`${config.database.uri}/products/products.txt`);
    }
}

module.exports = new ProductosDaoFileSystem(config.database.uri);