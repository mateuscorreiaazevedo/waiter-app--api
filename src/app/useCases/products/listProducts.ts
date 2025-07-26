import type { Request, Response } from 'express'
import { Product } from '../../models'

export async function listProducts(_req: Request, res: Response) {
  try {
    const products = await Product.find()

    return res.json(products)
  } catch {
    return res.sendStatus(500)
  }
}
