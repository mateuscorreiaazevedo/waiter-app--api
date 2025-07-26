import type { Request, Response } from 'express'
import z from 'zod'

import { Order } from '../../models'

const schema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
})

export async function deleteOrder(req: Request, res: Response) {
  try {
    const { success, data, error } = schema.safeParse(req.params)

    if (!success) {
      return res.status(400).json({ errors: error.issues })
    }

    const order = await Order.findOne({ _id: data.orderId })

    if (order?.status === 'IN_PRODUCTION') {
      return res.status(400).json({ error: 'Order is in production' })
    }

    await Order.findByIdAndDelete(data.orderId)

    return res.sendStatus(204)
  } catch {
    return res.sendStatus(500)
  }
}
