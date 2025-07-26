import type { Request, Response } from 'express'
import { Category } from '../../models'

export async function listCategories(_req: Request, res: Response) {
  const categories = await Category.find()

  return res.json(categories)
}
