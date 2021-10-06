const express = require('express')

const productosRouter = express.Router()

const Contenedor = require('../Contenedor');

const productosContenedor = new Contenedor('data/productos.json')

productosRouter.get('/', async(req, res)=>{

    const lista = await productosContenedor.getAll()
    res.send({
        message: 'Success',
        data: lista
            })
})

productosRouter.get('/:id', async(req, res)=>{

    const productId = req.params.id
    const product = await productosContenedor.getById(productId)
    if(!product){
        res.send({
            error: 'Producto no encontrado'
                })
    } else {
        res.send({
            message: 'Success',
            data: product
                })
    }
})

productosRouter.put('/:id', async(req, res)=>{

    const productId = req.params.id
    const product = req.body
    const productUpdated = await productosContenedor.updateById(productId, product)
    if(!productUpdated){
        res.send({
            message: 'Product with id ' + productId + ' does not exist'
                })
    } else {
        res.send({
            message: 'Product updated successfully',
            data: productUpdated
                })
    }
})

productosRouter.delete('/:id', async(req, res)=>{

    const productId = req.params.id
    await productosContenedor.deletebyId(productId)
    res.send({
        message: 'Product deleted successfully',
            })
})

productosRouter.post('/', async (req, res)=>{
    const newProduct= req.body
    const idProductSaved = await productosContenedor.save(req.body)
    res.send({
        message: 'Product added successfully',
        data: {
        ...newProduct,
        id: idProductSaved
    }

    })
})

module.exports = productosRouter