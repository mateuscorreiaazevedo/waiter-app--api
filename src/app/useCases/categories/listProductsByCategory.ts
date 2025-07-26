import type { Request, Response } from 'express'
import z from 'zod'
import { Product } from '../../models'

const schema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
})

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { success, data, error } = schema.safeParse(req.params)

    if (!success) {
      return res.status(400).json({ errors: error.issues })
    }

    const productsByCategory = await Product.find()
      .where('category')
      .equals(data.categoryId)

    return res.json(productsByCategory)
  } catch {
    return res.sendStatus(500)
  }
}
