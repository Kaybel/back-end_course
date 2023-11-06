import fs from 'fs'

class ProductManager {
    constructor () {
        this.path = './products.json'
    }

    async addProduct(product){
        try {
            if (Array.isArray(product)) {
                const addProducts = await this.addArrProduct(product)
                return addProducts
            } else {
                const addProduct = await this.addOneProduct(product)
                return addProduct
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addOneProduct(product) {
        try {
            if (!this.#validateData(product)) {
                return 'You need to add all the data if you want save the product'
            }
            const products = await this.getProducts()
            
            if (products.some((existingProduct) => existingProduct.code === product.code)) {
                return 'The product with the same code already exists'
            }
            const productID = Math.max(...products.map((p) => p.id), 0)
            const quantity = Math.max(...products.map((p) => p.quantity), 0)
            product.id = productID + 1
            product.quantity = quantity + 1
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async addArrProduct(product) {
        try {    
            const newProducts = []
    
            const products = await this.getProducts()
    
            for (const item of product) {
                if (this.#validateData(item)) {
                    if (!products.some((existingProduct) => existingProduct.code === item.code)) {
                        const productID = Math.max(...products.map((p) => p.id), 0)
                        const quantity = Math.max(...products.map((p) => p.quantity), 0)
                        item.id = productID + 1
                        item.quantity = quantity + 1
                        newProducts.push(item)
                    }
                }
            }
    
            if (newProducts.length > 0) {
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return newProducts
            } else {
                return 'The products were already in the database or had missing data.'
            }
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
                if(product.id !== undefined && product.id !== id){
                    return 'You cannot change the product id'
                } else {
                    // keep the same id
                    product.id = id
                    // change the data
                    products[productIndex] = product
                    // overwrite the json with the updated data
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                    return 'OK'
                }
            } else return 'The product you are looking for, not exist'
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
                return 'OK'
            } else return 'The product you are looking for, not exist'
        } catch (error) {
            console.log(error)
        }
    }
    
    #validateData(product) {
        const { title, description, price, thumbnail, code, stock, category, quantity } = product
    
        if (
            title && title.trim() !== '' &&
            description && description.trim() !== '' &&
            typeof price === 'number' &&
            (thumbnail === undefined || (Array.isArray(thumbnail) && thumbnail.every(str => typeof str === 'string'))) &&
            code && code.trim() !== '' &&
            typeof stock === 'number' &&
            category && category.trim() !== '' &&
            typeof quantity === 'number'
        ) return true
        return false
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
            stock: 25,
            category: 'some'
        }

        const product3 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc789',
            stock: 25,
            category: 'some'
        }

        const product4 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc852',
            stock: 25,
            category: 'some'
        }

        const product5 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def123',
            stock: 25,
            category: 'some'
        }

        const product6 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def456',
            stock: 25,
            category: 'some'
        }

        const product7 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'def789',
            stock: 25,
            category: 'some'
        }

        const product8 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi123',
            stock: 25,
            category: 'some'
        }

        const product9 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi456',
            stock: 25,
            category: 'some'
        }

        const product10 = {
            title: 'product test',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'ghi789',
            stock: 25,
            category: 'some'
        }

        const productManager = new ProductManager()
    }

}

export default ProductManager

// fs.unlink('./products.json', (err) => {
//     if (err) console.error('Error at JSON file when you try to delete')
//     else console.log('JSON file deleted successfully')
// })

//const test = new ProductManager()
//test.testing()