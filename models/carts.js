const Contenedor = require('../Container');

const cartsContainer = new Contenedor('data/carts.json')


const getProductsByCartdId = async(cartId)=>{
    const cartProducts = await cartsContainer.getById(cartId)
    const {products} = cartProducts
    return products
}

const createCart = async(newCart)=>{
    const idCartSaved = await cartsContainer.save(newCart)
    return idCartSaved
}

const deleteCartById = async (cartId)=>{
    await cartsContainer.deletebyId(cartId)
}

const deleteProductFromCart = async(cartId, productId)=>{
    const cartProducts = await cartsContainer.getById(cartId)
    const {products} = cartProducts
    products.splice(productId-1, 1)
    console.log({products})
    const newCart = {
        ...cartProducts,
        products
    }
    const cartUpdated = await cartsContainer.updateById(cartId, newCart)
    return cartUpdated
}


const updateCart = async (cartId, update)=>{
    const cartUpdated = await cartsContainer.updateById(cartId, update)
    return cartUpdated
}

const addProductsToCart = async (cartId, update)=>{
    const cartUpdated = await cartsContainer.updateById(cartId, update)
    return cartUpdated
}

module.exports= {getProductsByCartdId, 
    createCart, 
    deleteCartById, 
    updateCart, 
    addProductsToCart, 
    deleteProductFromCart}