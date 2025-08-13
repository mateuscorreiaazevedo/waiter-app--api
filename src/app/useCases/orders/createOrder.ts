import type { Request, Response } from 'express'
import z from 'zod'
import { socketService } from '../../..'
import { Order } from '../../models'

const schema = z.object({
  table: z.string().min(1, 'Table is required'),
  products: z.array(
    z.object({
      product: z.string().min(1, 'Product ID is required'),
      quantity: z.coerce.number().optional(),
    })
  ),
})

export async function createOrder(req: Request, res: Response) {
  try {
    const { success, data, error } = schema.safeParse(req.body)

    if (!success) {
      return res.status(400).json({ errors: error.issues })
    }

    const order = await Order.create({
      table: data?.table,
      products: data?.products,
      name: 'Order',
    })

    const orderDetails = await order.populate('products.product')

    socketService.emit('createNewOrder', orderDetails)

    return res.status(201).json(order)
  } catch {
    return res.sendStatus(500)
  }
}
