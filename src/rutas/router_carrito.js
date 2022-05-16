const express = require('express');
const router = express.Router();
const daoCarrito = require('../daos/index').daoCarrito;



router.get('/carrito/:id', async(req, res) => {
    try {
        
        let resultado = await daoCarrito.findCarrito(req.params.id);
        return res.status(400).send(resultado);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.post('/carrito', async(req, res) => {
    try {
        let resultado = await daoCarrito.addCarrito();
        return res.json(resultado);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});


router.put('/carrito/:id', async(req, res) => {
    try {
        let resultado = await daoCarrito.addProdCarrito(req.params.id, req.body);
        return res.json(resultado);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.delete('/carrito/:id', async(req, res) => {
    try {
        let result = await daoCarrito.deleteCarrito(req.params.id, req.body);// si recibe un body.id elimina el producto pasado, sino elimina el carrito
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;

