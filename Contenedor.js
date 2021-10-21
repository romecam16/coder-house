const fs = require ('fs')

class Contenedor{
    constructor(file) {
        this.file = file;
    }

    async save(producto){

        try{
            // 1. Leer archivo de productos
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            let productos = []

            // 2. Determinar Id nuevo basado en estado actual del archivo
            if(contenido === '') {
                producto.id = 1;
                productos.push(producto)
            }
            else {
                const listadeProducto = JSON.parse(contenido)
                producto.id = listadeProducto[listadeProducto.length-1].id + 1
                listadeProducto.push(producto)
                productos = listadeProducto
            }

            // 3. Guarda producto nuevo con el id calculado
            const productosString = JSON.stringify(productos,null, 2)
            await fs.promises.writeFile(`./${this.file}`, productosString)
            //4. Retorna id creado
            return producto.id
        } catch(error){
                console.error('Error: ', error)
        }
    }

    async deletebyId(id){
        try{
            //Lee el archivo de productos
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            const listaProductos = JSON.parse(contenido)
            //2. Crea una lista borrando el id especificado usando filtro, si el id no existe, se obtiene la misma lista
            const listaFiltrada = listaProductos.filter(x=>x.id!=id)
            const listaFiltradaString = JSON.stringify(listaFiltrada, null, 2)
            //3. Se guarda la lista filtrada.
            await fs.promises.writeFile(`./${this.file}`, listaFiltradaString)
        }catch(error){
            console.error('Error: ', error)
        }

    }

    async updateById(id, element){
        try{
            //1. Se obtiene la lista original
           const list = await this.getAll()
           //2. Se obtiene el elemento a editar
           const elementSaved = list.find(x=> x.id == id)
           //3. Se obtiene el índice del elemento a editar para sobreescribirlo posteriormente
           const indexElementSaved = list.findIndex(x=>x.id ==id)
           //4. Si el id no existe, se muestra un mensaje de error
           if (!elementSaved){
               console.error('Elemento con el id: ' + id + ' no fue encontrado')
               return null
           }
           //5. Se utiliza el spread operator para copiar los valores recibidos
           // en el body al elemento actualizado y se complementa con el id del elemento
           const elementUpdated = {
               ...element,
               id: parseInt(id, 10)
           }
           //6. Se actualiza el elemento en la lista con el nuevo elemento actualizado
           list[indexElementSaved] = elementUpdated
           //7. Se guarda la lista con el elemento actualizado
           const listString = JSON.stringify(list, null, 2)
           await fs.promises.writeFile(`./${this.file}`, listString)
           //8. Retornamos el elemento actualizado
           return elementUpdated
        }catch(error){
            console.error('Error: ', error)
        }

    }

    async getById(id){
        try{
            //1.Lee el archivo de productos
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            const listaProductos = JSON.parse(contenido)
            //3. Crea una lista filtrando por el id del producto
            const listaFiltrada = listaProductos.find(x=>x.id==id)
            //4. Retorna la lista con el producto filtrado
            return listaFiltrada
        }catch(error){
            console.error('Error: ', error)
        }

    }



    async getAll(){
        //1. Lectura archivo
        try{
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            if (!contenido){
                return null
            } else {
                const listaProductos = JSON.parse(contenido)
                //2. Devuelve el listado de productos
                return listaProductos
            }
            
        }catch(error){
            console.error('Error: ', error)
        }

    }

    async deleteAll(){

        try{
            //1. Se borra el contenido del archivo
            await fs.promises.writeFile(`./${this.file}`, '')
        }catch(error){
            console.error('Error: ', error)
        }
    }
}

module.exports = Contenedor;