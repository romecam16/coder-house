const Container = require('../Container');

const productsContainer = new Container('data/products.json')

const getAllProducts = async()=>{
    const list = await productsContainer.getAll()
    return list
}

const getProductById = async(productId)=>{
    const product = await productsContainer.getById(productId)
    return product
}

const createProduct = async(newProduct)=>{
    const idProductSaved = await productsContainer.save(newProduct)
    return idProductSaved
}

const deleteProductById = async (productId)=>{
    await productsContainer.deletebyId(productId)
}

const updateProduct = async (productId, product)=>{
    const productUpdated = await productsContainer.updateById(productId, product)
    return productUpdated
}

module.exports= {getAllProducts, getProductById, createProduct, 
    deleteProductById, updateProduct}