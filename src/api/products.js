import express from 'express'
import ProductManager from '../ProductManager.js'

const productManager = new ProductManager()
const productsRouter = express.Router()


productsRouter.get('/', async (req, res) => {
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

productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const product = await productManager.getProductById(pid)

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'The parameter << pid >> is not a number' })
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.json(product)

    } catch (error) {
        return res.status(500).json({ error: 'Products not found' })
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const productData = req.body

        const result = await productManager.addProduct(productData)

        if (typeof result !== 'string') {
            return res.status(201).json({ message: 'Product added successfully' })
        } else {
            return res.status(400).json({ error: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const productData = req.body

        if (isNaN(pid)) {
            return res.status(400).json({ error: 'The parameter << pid >> is not a number' })
        }

        const result = await productManager.updateProduct(pid, productData)

        if (result === 'OK') {
            return res.status(202).json({ message: 'Product updated successfully' })
        } else {
            return res.status(400).json({ error: result })
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)

        const result = await productManager.deleteProduct(pid)

        if (result === 'OK') {
            return res.status(202).json({ message: 'Product deleted successfully' })
        } else {
            return res.status(400).json({ error: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default productsRouter