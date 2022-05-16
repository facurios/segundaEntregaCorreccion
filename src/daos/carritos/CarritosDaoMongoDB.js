// const config = require('../../../config.json');
const ContenedorMongoDB = require('../../contenedores/contenedorMongoDb');

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('carritos');
    }
}

module.exports = new CarritosDaoMongoDB();