import { model, Schema } from 'mongoose'

export const Order = model(
  'order',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
      default: 'WAITING',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
)
