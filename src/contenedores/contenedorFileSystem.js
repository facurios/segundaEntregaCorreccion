const res = require('express/lib/response');
const fs = require('fs');

module.exports = class Products {  // Clase Producto
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    //=============Productos==========
    findAll = async (id) => {
        try {
            if (!id) {
                if (fs.existsSync(this.nombreArchivo)) {
                    let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                    content = JSON.parse(content)
                    return content;
                } else {
                    return [];
                }
            } else {
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                content = JSON.parse(content)
                let productId = content.filter(product => product.id == id);;
                return productId
            }

        } catch (error) {
            return(error);
        }
    }
    saveProducts = async (product) => {
        try {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(product, null, '\t'), 'utf-8');
            return (true);
        } catch (error) {
            return(error);
        }

    }
    createProduct = async (body) => {

        if (fs.existsSync(this.nombreArchivo)) {
            let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
            content = JSON.parse(content)
            let product = body;
            let { title, description, thumbnail, price, stock } = product;
            if (!title || !description || !thumbnail || !price || !stock) {
                return ({
                    message: 'Faltan datos',
                    description: 'Faltan datos'
                })
            } else {
                let mayor = -1;
                content.forEach(prod => {
                    if (prod.id > mayor) {
                        mayor = prod.id
                    }
                });
                let index = content.findIndex(prod => prod.id === mayor)
                content.push({ id: content[index].id + 1, timestamp: Date.now(), ...body })
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8');

            }
            return 'Producto agregregado correctamente';
        } else {
            return [];
        }

    }
    updateProduct = async (id, body) => {
        id = parseInt(id)
        let { title, description, thumbnail, price, stock } = body;
        if (id === undefined) {
            res.status(400).send({
                message: 'Faltan datos',
                description: 'id'
            });
        } else {
            let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
            content = JSON.parse(content)
            let index = content.findIndex(product => product.id === id);
            if (index === -1) {
                return ({
                    message: 'Producto inexistente',
                    description: `id: ${id}`
                });
            } else {
                if (!title || !description || !thumbnail || !price || !stock) {
                    return ({
                        message: 'Faltan datos',
                        description: 'Faltan datos'
                    })
                } else {
                    content[index].title = title;
                    content[index].description = description;
                    content[index].thumbnail = thumbnail;
                    content[index].price = price;
                    content[index].stock = stock;
                    return await this.saveProducts(content).catch(err => {
                        return ({
                            message: 'Error',
                            description: err
                        })
                    }
                    )
                }

            }

        }

    }

    deleteProduct = async (id) => {
        id = parseInt(id);
        if (id === undefined) {
            return ({
                message: 'Faltan datos',
                description: 'id'
            });
        } else {
            let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
            content = JSON.parse(content)
            let productId = content.find(product => product.id === id);
            if (!productId) {
                return ({
                    message: 'Producto inexistente',
                    description: `id: ${id}`
                });
            } else {
                content = content.filter(product => product.id !== id);
                return await this.saveProducts(content).then(() => {
                    return ({
                        message: 'Producto eliminado',
                        description: `id: ${id}`
                    })
                }).catch(err => {
                    return ({
                        message: 'Error',
                        description: err
                    })
                }
                )
            }
        }
    }
    //=============Carrito==========
    findCarrito(id) {
        try {
            
            if (!fs.existsSync(this.nombreArchivo))return ({message: "no se puede encontrar la base de datos"})
                
            let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
            content = JSON.parse(content)
            let productId = content.filter(product => product.id == id);;
            return (productId)

        } catch (error) {
            return(error);
        }
    }
    addCarrito() {
        if (!fs.existsSync(this.nombreArchivo))return ({message: "no se puede encontrar la base de datos"})
        let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
        content = JSON.parse(content)
        let mayor = -1;
        content.forEach(prod => {
            if (prod.id > mayor) {
                mayor = prod.id
            }
            });
        let index = content.findIndex(cart => cart.id === mayor)
        content.push({ id: content[index].id + 1, timestamp: new Date(), products: [] })
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8');
        
         return ({message: 'Carrito Creado'})
    }

    deleteCarrito(idCart,body) {
        try {
            if (!fs.existsSync(this.nombreArchivo))return ({message: "no se puede encontrar la base de datos"})
            if(body.id){
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                content = JSON.parse(content)
                let index = content.findIndex(cart => cart.id === parseInt(idCart))
                if (index === -1)return ({message: "El carrito no existe"})
                let indexProd = content[index].products.findIndex(prod => prod.id === parseInt(body.id))
                if (indexProd != -1){
                    if(content[index].products[indexProd].quantity > 1){
                    content[index].products[indexProd].quantity --;
                    fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8')
                    return ({message: 'Prod Cantidad eliminada'})
                    }else{
                        let nuevo = content[index].products.filter(cart => cart.id!= body.id)
                        content[index].products = nuevo
                        fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8');
                        return ({message: 'Producto eliminado'})
                    }
                }else{
                    return ({message: 'Error', description:'El producto no se encuentra en el carrito'})
                }
                
                
            }else{
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                content = JSON.parse(content)
                let nuevo = content.filter(cart => cart.id!= idCart)
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(nuevo, null, '\t'), 'utf-8');
                return ({message: `Carrito eliminado ID: ${id} correctamente`})
            }
            
        } catch (error) {
            return error;
        }
    }

    addProdCarrito(idCart, body) {
        try {
            if (!fs.existsSync(this.nombreArchivo))return ({message: "no se puede encontrar la base de datos"})
            if(!body.id) return({message: "Falta ingresar ID del productoS"})
            let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
            content = JSON.parse(content)
            let index = content.findIndex(cart => cart.id === parseInt(idCart))
            if (index === -1)return ({message: "El carrito no existe"})
            let indexProd = content[index].products.findIndex(prod => prod.id === parseInt(body.id))
            if (indexProd != -1){
                content[index].products[indexProd].quantity ++;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8')
            }else{
                content[index].products.push({id: parseInt(body.id), quantity: 1});
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(content, null, '\t'), 'utf-8')
            }
            return ({message: `Productos ID: ${body.id}, agregado correctamente`})


        } catch (error) {
            return error

        }


    }


}