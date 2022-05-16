const config = require('../../config.js');
let daoProductos;
let daoCarrito;
switch (config.database.engine) {
    case 'mongodb':
        daoProductos = require('./productos/ProductosDaoMongoDB');
        daoCarrito = require('./carritos/CarritosDaoMongoDB')
        break;
    case 'fileSystem':
        daoProductos = require('./productos/ProductosDaoFileSystem');
        daoCarrito = require('./carritos/CarritosDaoFileSystem')
        break;
    default:
        daoProductos = require('./productos/ProductosDaoMongoDB');
        daoCarrito = require('./carritos/CarritosDaoMongoDB')
}
module.exports = {
    daoProductos,
    daoCarrito
}