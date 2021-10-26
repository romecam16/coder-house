const express = require('express')

const { Server: SocketServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const productosRouter = require('./routers/productos.js')

const Contenedor = require('./Contenedor');

const productosContenedor = new Contenedor('data/productos.json')

const server = express()

const port = 8080

server.set('view engine', 'ejs')

server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.use('/api/productos', productosRouter)
server.use('/form', express.static('public'));


server.get('/',  (req,res)=>{
    res.send({message: new Date()})
})

server.get('/list-products', async (req, res)=>{
    
    const lista = await productosContenedor.getAll()
    res.render('pages/index', {
        lista
    }) 

})

//turn on server
server.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
})
//error management
server.on('error', (error) =>{
    console.log('Error', error)
})