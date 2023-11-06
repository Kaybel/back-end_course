import fs from 'fs'
import ProductManager from './ProductManager.js'

const productManager = new ProductManager()

class CartManager {
    constructor () {
        this.path = './cart.json'
    }

    async addCart(productData) {
        try {
            const result = await productManager.addProduct(productData)

            if (typeof result !== 'string') {
                const carts = await this.getCarts()
            
                const cartID = Math.max(...carts.map((c) => c.id), 0)
                const quantity = Math.max(...carts.map((c) => c.quantity), 0)
                const cart = {
                    id: cartID + 1,
                    products: Array.isArray(result) ? result : [result],
                    quantity: quantity + 1
                }
                cart.products = result.products || result
                carts.push(cart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return 'OK'
            } else return result
            
        } catch (error) {
            console.log(error)
        }
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(carts)
            } else return []
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find((cart) => cart.id === id)

            if (cart) return cart
            else return null

        } catch (error) {
            console.log(error)
        }
    }

    async getProductsByCartId(id) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find((cart) => cart.id === id)
    
            if (cart) {
                const products = []
    
                for (const product of cart.products) {
                    const eachProduct = await productManager.getProductById(product.id)
    
                    if (eachProduct) {
                        products.push(eachProduct)
                    }
                }

                return products
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductInCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid)
    
            if (cart) {
                const productIndex = cart.products.findIndex((product) => product.id === pid)
                
                if (productIndex !== -1) {
                    // the product exists in the car so add 1 in the quantity
                    cart.products[productIndex].quantity = (cart.products[productIndex].quantity || 0) + 1
                } else {
                    //  the product doesn't exists in the car
                    const productData = await productManager.getProductById(pid)
                    if (productData) {
                        productData.quantity = 1
                        cart.products.push(productData)
                    } else {
                        return 'Product not found'
                    }
                }
                const carts = await this.getCarts()
                const cartIndex = carts.findIndex((c) => c.id === cid)
                if (cartIndex !== -1) {
                    carts[cartIndex] = cart
                    await fs.promises.writeFile(this.path, JSON.stringify(carts))
                    return 'OK'
                } else {
                    return 'Error updating cart'
                }

            } else {
                return 'Cart not found'
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    

}

export default CartManager

// fs.unlink('./cart.json', (err) => {
//     if (err) console.error('Error at JSON file when you try to delete')
//     else console.log('JSON file deleted successfully')
// })

//const test = new CartManager()