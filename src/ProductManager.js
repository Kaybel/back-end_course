import fs from 'fs'

class ProductManager {
    constructor () {
        this.path = './products.json'
    }

    async addProduct(product) {
        try {
            if (!this.#validateData(product)) {
                return 'You need to add all the data if you want save the product'
            }
            const products = await this.getProducts()
            
            if (products.some((existingProduct) => existingProduct.code === product.code)) {
                return 'The product with the same code already exists'
            }
            const productID = Math.max(...products.map((p) => p.id), 0)
            product.id = productID + 1
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return 'Product added successfully'
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(products)
            } else return []
        } catch (error) {
            console.log(error)
        }
    }

    #validateData(product) {
        const { title, description, price, thumbnail, code, stock } = product
        if (
            title && title.trim() !== '' &&
            description && description.trim() !== '' &&
            typeof price === 'number' &&
            thumbnail && thumbnail.trim() !== '' &&
            code && code.trim() !== '' &&
            typeof stock === 'number'
        ) return true
        return false
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find((product) => product.id === id)
            if (product) return product
            else return null
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, product) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex((product) => product.id === id)
            if (productIndex !== -1) {
                // keep the same id
                product.id = id
                // change the data
                products[productIndex] = product
                // overwrite the json with the updated data
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return 'Product updated successfully'
            } else return null
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex((product) => product.id === id)
            if (productIndex !== -1) {
                // delete the data by the id in the arr
                products.splice(productIndex, 1)
                // overwrite the json with the deleted data
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return 'Product deleted successfully'
            } else return null
        } catch (error) {
            console.log(error)
        }
    }

    async testing() {
        // Objetos de prueba
        const product1 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25
        }

        const product2 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc456',
            stock: 25
        }

        const product3 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc789',
            stock: 25
        }

        const product4 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc852',
            stock: 25
        }

        const product5 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def123',
            stock: 25
        }

        const product6 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def456',
            stock: 25
        }

        const product7 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def789',
            stock: 25
        }

        const product8 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi123',
            stock: 25
        }

        const product9 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi456',
            stock: 25
        }

        const product10 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi789',
            stock: 25
        }


        // Se creará una instancia de la clase “ProductManager”
        const productManager = new ProductManager()

        // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
        // // console.log(await productManager.getProducts())

        // Se llamará al método “addProduct” con los campos:
        // title: “producto prueba”
        // description:”Este es un producto prueba”
        // price:200,
        // thumbnail:”Sin imagen”
        // code:”abc123”,
        // stock:25
        // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
        // // console.log(await productManager.addProduct(product1))
        // // console.log(await productManager.addProduct(product2))
        // // console.log(await productManager.addProduct(product3))
        // // console.log(await productManager.addProduct(product4))
        // // console.log(await productManager.addProduct(product5))
        // // console.log(await productManager.addProduct(product6))
        // // console.log(await productManager.addProduct(product7))
        // // console.log(await productManager.addProduct(product8))
        // // console.log(await productManager.addProduct(product9))
        // // console.log(await productManager.addProduct(product10))

        //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
        // //console.log(await productManager.getProducts())

        //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
        // //console.log(await productManager.getProductById(1))
        // //console.log(await productManager.getProductById(15))

        //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
        // //console.log(await productManager.updateProduct(1, product3))
        // //console.log(await productManager.getProducts())

        //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
        // //console.log(await productManager.deleteProduct(1))
        // //console.log(await productManager.getProducts())

        //Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
        // //console.log(await productManager.addProduct(product2))

        // Se evaluará que addProduct devuelva error si no encuentra algun parametro (parametro vacio sino node retorna error)
        // //console.log(await productManager.addProduct(product4))
    }

}

export default ProductManager

// fs.unlink('./products.json', (err) => {
//     if (err) console.error('Error at JSON file when you try to delete')
//     else console.log('JSON file deleted successfully')
// })

//const test = new ProductManager()
//test.testing()