class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre //String
        this.apellido = apellido //String
        this.libros = libros //Object[]
        this.mascotas = mascotas // String []
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }

}

const usuario =
    new Usuario("Camilo",
        "Romero",
        [{"nombre": "Cien años de soledad", "autor": "Gabriel Garcia Marquez"}, {"nombre": "Rayuela", "autor": "Julio Cortazar"}],
        ["Lucky", "Luna"])


console.log(`El nombre del usuario es ${usuario.getFullName()}`)
usuario.addMascota("Coco")
console.log(`El numero de mascotas del usuario es ${usuario.countMascotas()}`)
usuario.addBook("Pedro Paramo", "Juan Rulfo")
console.log(`Los nombres de los libros del usuario son ${usuario.getBookNames()}`)
