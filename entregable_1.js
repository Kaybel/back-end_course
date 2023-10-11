class ProductManager {
    constructor () {
        this.products = []

    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find((product) => product.code === code)) {
            return 'the code camp already exists';
        }
    
        const product = {
            id: this.#createId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
    
        if (this.validateData(title, description, price, thumbnail, code, stock)) {
            this.products.push(product)
            return 'you add succesfully a product'
        } else {
            return 'you need to add all the data for save the product'
        }
    }
    validateData(title, description, price, thumbnail, code, stock) {
        if (title && title.trim() !== '' &&
            description && description.trim() !== '' &&
            typeof price === 'number' &&
            thumbnail && thumbnail.trim() !== '' &&
            code && code.trim() !== '' &&
            typeof stock === 'number') return true
        else return false
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        let validate = this.products.find((product) => product.id === id)
        if (validate) return this.products.find((product) => product.id === id)
        else return 'not found'
    }
    #createId() {
        let inicialId = 0
        this.products.map((product) => {
            if(product.id > inicialId) inicialId = product.id
        })
        return inicialId
    }
}


//                    TEST

//Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager()

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts())

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log(productManager.addProduct('product test', 'this is a product test', 200, 'no image', 'abc123', 25))
console.log(productManager.addProduct('product test', 'this is a product test', 200, 'no image', 'abc124', 25))
console.log(productManager.addProduct('product test', 'this is a product test', 200, 'no image', 'abc125', 25))

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts())

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
console.log(productManager.addProduct('product test', 'this is a product test', 200, 'no image', 'abc123', 25))

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(15))


// Se evaluará que addProduct devuelva error si no encuentra algun parametro (parametro vacio sino node retorna error)
console.log(productManager.addProduct('','this is a product test', 200, 'no image', 'abc126', 25))
