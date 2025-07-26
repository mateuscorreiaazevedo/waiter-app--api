import type { Request, Response } from 'express'
import z from 'zod'
import { Product } from '../../models'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  ingredients: z
    .string()
    .optional()
    .transform((data) => (data ? JSON.parse(data) : undefined)),
})

export async function createProduct(req: Request, res: Response) {
  try {
    const { success, data, error } = schema.safeParse(req.body)

    if (!success) {
      return res.status(400).json({ errors: error.issues })
    }

    const imagePath = req.file?.filename

    if (!imagePath) {
      return res.status(400).json({ error: 'Image is required' })
    }

    const product = await Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      ingredients: data.ingredients,
      imagePath,
    })

    return res.status(201).json(product)
  } catch {
    return res.sendStatus(500)
  }
}
