const res = require('express/lib/response');
const { ObjectId } = require('mongodb');
const config = require('../../config');
const cliente = require('../conexiones/clienteMongoDB');

const database = cliente.db(config.database.name);
class ContenedorMongoDB {

    constructor(collection) {
        this.collection = database.collection(collection);
    }
//Productos=====
async findAll(idProd) {
    try {
        idProd= parseInt(idProd)
        if(idProd ){
            const cursor = this.collection.find({id: idProd})
            let array = await cursor.toArray()
            if(array[0] === undefined) return("el producto solicitado no existe")
            return array
        }else{
            const cursor = this.collection.find({})
            let array = await cursor.toArray()
            return array 
        }
    } catch (error) {
        console.error("There was an error retrieving all collection " + error);
        return [];
    }
}

    async createProduct(body){
        try {
            if(!body.title & !body.price & !body.description & !body.thumbnail & !body.stock) return('Falta ingresar valores')
            let id = await this.collection.find({}).sort({id: -1}).limit(1).toArray()
            let newRecord = { id: id[0].id+1, timestamp: Date.now(), ...body };
            await this.collection.insertOne(newRecord)
            return 'Producto agregado correctamente'
        } catch (error) {
            return error
        }

    }
    async updateProduct(id, body){
        try {     
            for(let key in body){   //no me gusta pero encontrar la vuelta para cambiar el switch
                switch (key) {
                    case 'title':
                        await this.collection.updateOne({id: parseInt(id)}, {$set: {title: body[key]}})
                    break;
                    case 'price':
                        await this.collection.updateOne({id: parseInt(id)}, {$set: {price: body[key]}})
                    break;
                    case 'description':
                        await this.collection.updateOne({id: parseInt(id)}, {$set: {description: body[key]}})
                    break;
                    case 'stock':
                        await this.collection.updateOne({id: parseInt(id)}, {$set: {stock: body[key]}})
                    break;
                    case 'thumbnail':
                        await this.collection.updateOne({id: parseInt(id)}, {$set: {thumbnail: body[key]}})
                    break;

                };
            };
            return 'Producto actualizado correctamente'
        } catch (error) {
            console.error("There was an error retrieving all collection " + error);
            return error; 
        }
        
    }
    async deleteProduct(id){
        try {
            await this.collection.deleteOne({id: parseInt(id)})
            return `se eliminó producto id ${id}`
        } catch (error) {
            return error; 
        }
    }

//Carrito ================
    async findCarrito(id){
        try {
            const cursor = this.collection.find({id: parseInt(id)})
            let array = await cursor.toArray()
            if(!array[0]) return ("Carrito inexistente")
            return array
        } catch (error) {
            console.error("There was an error retrieving all collection " + error);
            return [];
        }
    }
    async addCarrito(){
        const cursor = this.collection.find({}).sort({id: -1}).limit(1)
        let nuevo = await cursor.toArray()
        this.collection.insertOne({
            id: nuevo[0].id+1,
            timestamp: Date.now(),
            products: []
        })
        return (`carrito creado correctamente. ID ${nuevo[0].id+1}`)
    }

    async deleteCarrito(idCart,body){
        try {
            if(!parseInt(body.id)){
                this.collection.deleteOne({id: parseInt(idCart)})
                return (`se eliminó Carrito id ${parseInt(idCart)}`)
            
            }else{
                let idProd = body.id
                const cursor = this.collection.find({id: parseInt(idCart)})
                const nuevo = await cursor.toArray()
                
                let index = nuevo[0].products.findIndex(prod => prod.id === parseInt(idProd))
                if(index != -1){
                    let productos = nuevo[0].products
                    if(productos[index].quantity > 1){
                    productos[index].quantity --
                    this.collection.updateOne({id: parseInt(idCart)}, {$set: {products: productos}})
                    return (`Producto ID: ${idProd} borrado correctamente`)
                    }else{
                        let newArray = productos.filter(prod => prod.id != parseInt(idProd))
                        this.collection.updateOne({id: parseInt(idCart)}, {$set: {products: newArray}})
                        return (`Producto ID: ${idProd} borrado correctamente`)
                    }
                    
                }else{
                    return (`el Producto ID ${idProd} no se encuentra en este carrito`)
                }

            }
        } catch (error) {
            return error; 
        }
    }

    async addProdCarrito(idCart, body){
        try {
            let idProd = body.id
        const cursor = this.collection.find({id: parseInt(idCart)})
        const nuevo = await cursor.toArray()
        
        let index = nuevo[0].products.findIndex(prod => prod.id === parseInt(idProd))
        if(index != -1){
            let productos = nuevo[0].products
            productos[index].quantity ++
            this.collection.updateOne({id: parseInt(idCart)}, {$set: {products: productos}})
        }else{
            let productos = nuevo[0].products
            productos.push({id: parseInt(idProd), quantity: 1})
            this.collection.updateOne({id: parseInt(idCart)}, {$set: {products: productos}})
        }
        return(`Producto ID: ${idProd} agregado en Cart: ${idCart}`)


        } catch (error) {
            return error
            
        }


    }


}


module.exports = ContenedorMongoDB;