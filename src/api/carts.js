import express from 'express'
import CartManager from '../CartManager.js'

const cartManager = new CartManager()
const cartsRouter = express.Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const productData = req.body

        const result = await cartManager.addCart(productData)

        if (result === 'OK') {
            return res.status(201).json({ message: 'Cart added successfully' })
        } else {
            return res.status(400).json({ error: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid )
        const cartInfo = await cartManager.getProductsByCartId(cid)

        if (isNaN(cid)) {
            return res.status(400).json({ error: 'The parameter << cid >> is not a number' })
        }

        if (!cartInfo) {
            return res.status(404).json({ error: 'Products in cart not found' })
        }

        res.json(cartInfo)

    } catch (error) {
        return res.status(500).json({ error: 'Cart not found' })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid)
        const pid = parseInt(req.params.pid)

        const result = await cartManager.addProductInCart(cid, pid)

        if (result === 'OK') {
            return res.status(201).json({ message: 'Product added successfully in cart' })
        } else {
            return res.status(400).json({ error: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default cartsRouter