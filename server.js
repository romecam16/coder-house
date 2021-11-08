const express = require('express')

const Contenedor = require('./Contenedor');


const miContenedor = new Contenedor('productos.json')

const port = 8080

const server = express()

//base
server.get('/', async (req, res, next)=>{
    const saludo = 'Bienvenido al servicio de productos'
    res.send(saludo)
    
})

//products endpoint
server.get('/productos', async (req, res, next)=>{
    const productos = await miContenedor.getAll()
    res.json(productos)
    
})

//random product endpoint
server.get('/productoRandom', async (req, res, next)=>{
    const productos = await miContenedor.getAll()
    res.json(productos[Math.round(Math.random() * productos.length)])
    
})


//turn on server
server.listen(8080, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
})

//error management
server.on('error', (error) =>{
    console.log('Error', error)
})