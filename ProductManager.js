const fs = require('fs')




class ProductManager {
    constructor () {
        this.path = './products.json'
    }

    async addProduct(product) {
        try {
            if(this.#validateData(product)){
                const products = await this.getProducts()
                const productID = Math.max(...products.map((p) => p.id), 0)
                product.id = productID + 1
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return 'Product added successfully'
            } else return 'You need to add all the data if you want save the product'
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
            else return 'Product not found'
        } catch (error) {
            console.log(error)
        }
    }

    async updateProductById(id, product) {
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
            } else return 'Product not found'
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById(id) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex((product) => product.id === id)
            if (productIndex !== -1) {
                // delete the data by the id in the arr
                products.splice(productIndex, 1)
                // overwrite the json with the deleted data
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return 'Product deleted successfully'
            } else return 'Product not found'
        } catch (error) {
            console.log(error)
        }
    }
}