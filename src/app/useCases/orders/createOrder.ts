import type { Request, Response } from 'express'
import z from 'zod'

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

    return res.status(201).json(order)
  } catch {
    return res.sendStatus(500)
  }
}
