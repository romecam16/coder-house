const express = require('express')
const { createCart, deleteCartById, getProductsByCartdId, addProductsToCart, deleteProductFromCart } = require('../models/carts')

const cartsRouter = express.Router()



cartsRouter.get('/:id/products', async(req, res)=>{

    const cartId = req.params.id
    const cartProducts = await getProductsByCartdId(cartId)
    if(!cartProducts){
        res.send({
            error: 'The cart is empty'
                })
    } else {
        res.send({
            products: cartProducts
                })
    }
})


cartsRouter.delete('/:id', async(req, res)=>{

    const cartId = req.params.id
    await deleteCartById(cartId)
    res.send({
        message: 'Cart deleted successfully',
            })
})

cartsRouter.delete('/:id/products/:id_prod', async(req, res)=>{

    const cartId = req.params.id
    const productId = req.params.id_prod
    const cart = await deleteProductFromCart(cartId, productId)
    res.send({
        message: 'Product Successfully Deleted From Cart',
        data: cart
            })
})



cartsRouter.post('/:id/products', async (req, res)=>{

    const cartId = req.params.id
    const product= req.body

    const cart = await addProductsToCart(cartId, product)

    if(!cart){
        res.send({
            message: 'Cart Id Not Found',
                })
    }
    else{
        res.send({
            message: 'Products added successfully to the cart',
            data: cart
        })  
    }

})

cartsRouter.post('/', async (req, res)=>{
    const newCart= req.body
    const idCartSaved = await createCart(newCart)
      res.send({
        message: 'Cart added successfully',
        data: {
        ...newCart,
        id: idCartSaved
    }

    })  
})

module.exports = cartsRouter