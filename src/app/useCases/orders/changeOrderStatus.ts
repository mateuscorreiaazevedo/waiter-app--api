import type { Request, Response } from 'express'
import z from 'zod'

import { Order } from '../../models'

const bodySchema = z.object({
  status: z.enum(['WAITING', 'IN_PRODUCTION', 'DONE']),
})
const paramsSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
})

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const body = bodySchema.safeParse(req.body)
    const params = paramsSchema.safeParse(req.params)

    if (!(body.success && params.success)) {
      return res
        .status(400)
        .json({ errors: (body.error || params.error)?.issues })
    }

    await Order.findByIdAndUpdate(params.data.orderId, {
      status: body.data.status,
    })

    return res.sendStatus(204)
  } catch {
    return res.sendStatus(500)
  }
}
