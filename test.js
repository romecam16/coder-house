const Contenedor = require('./Contenedor');

const miContenedor = new Contenedor('productos.json')

const miCervezaNacional = {
    title: 'Club Colombia',
    price: 5000
}

const main = async() => {
    const id = await miContenedor.save(miCervezaNacional)
    const list = await miContenedor.getAll()
    const producto = await miContenedor.getById(1)
    await miContenedor.deletebyId(1)
    await miContenedor.deleteAll()

}

main()



