import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager()
const PORT = 8080

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const products = await productManager.getProducts()

        if (!isNaN(limit) && limit > 0) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Products not found' })
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const product = await productManager.getProductById(pid)

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'The parameter << pid >> is not a number' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.json(product)

    } catch (error) {
        return res.status(500).json({ error: 'Products not found' })
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
