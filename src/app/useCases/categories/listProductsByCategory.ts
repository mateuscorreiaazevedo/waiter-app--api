import type { Request, Response } from 'express'
import { Product } from '../../models'

export async function listProductsByCategory(_req: Request, res: Response) {
  try {
    const categories = await Product.find()

    return res.json(categories)
  } catch {
    return res.sendStatus(500)
  }
}
