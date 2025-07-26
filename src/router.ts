import { Router } from 'express'
import { createCategory, listCategories } from './app/useCases/categories'

export const router = Router()

// List Categories
router.get('/categories', listCategories)

// Create category
router.post('/categories', createCategory)

// List Products
router.get('/products', (_, res) => {
  res.send('List Products')
})

// Create product
router.post('/products', (_, res) => {
  res.send('Create product')
})

// List Products by Category
router.get('/categories/:categoryId/products', (_, res) => {
  res.send('Get Product by Category')
})

// List Orders
router.get('/orders', (_, res) => {
  res.send('List Orders')
})

// Create Order
router.post('/orders', (_, res) => {
  res.send('Create Order')
})

// Change Order Status
router.patch('/orders/:orderId/status', (_, res) => {
  res.send('Change Order Status')
})

// Delete/Cancel Order
router.delete('/orders/:orderId', (_, res) => {
  res.send('Delete Order')
})
