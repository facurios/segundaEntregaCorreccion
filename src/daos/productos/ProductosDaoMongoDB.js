const config = require('../../../config');
const ContenedorMongoDB = require('../../contenedores/contenedorMongoDb');

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('productos');
    }
}

module.exports = new ProductosDaoMongoDB();