const express = require('express')

const productsRouter = require('./routers/products.js')
const cartsRouter = require('./routers/carts.js')

const server = express()
const port = 8080

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use('/api/products', productsRouter)
server.use('/api/carts', cartsRouter)
server.use(function(req, res) {
    // Invalid requests
          res.status(404).json({
            error: -2,
            description: 'route ' +req.baseUrl + req.path + ' method ' + req.method + ' not implemented'
          });
    })
server.use('/form', express.static('public'));

server.get('/',  (req,res)=>{
    res.send({data: new Date()})
})

//turn on server
server.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
})
//error management
server.on('error', (error) =>{
    console.log('Error', error)
})
