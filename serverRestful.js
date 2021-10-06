const express = require('express')

const productosRouter = require('./routers/productos.js')

const server = express()

const port = 8080

server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.use('/api/productos', productosRouter)
server.use('/static', express.static('public'));


server.get('/',  (req,res)=>{
    res.send({message: new Date()})
})

//turn on server
server.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
})
//error management
server.on('error', (error) =>{
    console.log('Error', error)
})