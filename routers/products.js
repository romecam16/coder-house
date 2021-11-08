const express = require('express')
const  isAdmin  = require('../middlewares/isAdmin.js')
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProduct } = require('../models/products')
const productsRouter = express.Router()


productsRouter.get('/', async(req, res)=>{
    const lista = await getAllProducts()
    if(!lista){
        res.send({
            error: 'Product Not Found'
                }) 
    } else {
        res.send({
            data: lista
                })
    }

})

productsRouter.get('/:id', async(req, res)=>{

    const productId = req.params.id
    const product = await getProductById(productId)
    if(!product){
        res.send({
            error: 'Product Not Found'
                })
    } else {
        res.send({
            message: 'Success',
            data: product
                })
    }
})

//It was added the middleware isAdmin
productsRouter.put('/:id', isAdmin, async(req, res)=>{

    const productId = req.params.id
    const product = req.body
    const productUpdated = await updateProduct(productId, product)
    
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

//It was added the middleware isAdmin
productsRouter.delete('/:id', isAdmin, async(req, res)=>{

    const productId = req.params.id
    await deleteProductById(productId)
    res.send({
        message: 'Product deleted successfully',
            })
})

//It was added the middleware isAdmin
productsRouter.post('/', isAdmin, async (req, res)=>{
    const newProduct= req.body
    const idProductSaved = await createProduct(newProduct)
      res.send({
        message: 'Product added successfully',
        data: {
        ...newProduct,
        id: idProductSaved
    }

    })  
})

module.exports = productsRouter