import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import {
  createCategory,
  listCategories,
  listProductsByCategory,
} from './app/useCases/categories'
import { createOrder, listOrders } from './app/useCases/orders'
import { createProduct, listProducts } from './app/useCases/products'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

// List Categories
router.get('/categories', listCategories)

// Create category
router.post('/categories', createCategory)

// List Products
router.get('/products', listProducts)

// Create product
router.post('/products', upload.single('image'), createProduct)

// List Products by Category
router.get('/categories/:categoryId/products', listProductsByCategory)

// List Orders
router.get('/orders', listOrders)

// Create Order
router.post('/orders', createOrder)

// Change Order Status
router.patch('/orders/:orderId/status', (_, res) => {
  res.send('Change Order Status')
})

// Delete/Cancel Order
router.delete('/orders/:orderId', (_, res) => {
  res.send('Delete Order')
})
