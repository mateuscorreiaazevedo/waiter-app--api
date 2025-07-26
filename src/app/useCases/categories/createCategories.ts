import type { Request, Response } from 'express'
import z from 'zod'
import { Category } from '../../models'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
})

export async function createCategory(req: Request, res: Response) {
  const { success, data, error } = schema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ errors: error.issues })
  }

  const category = await Category.create({
    name: data.name,
    icon: data.icon,
  })

  return res.status(201).json(category)
}
