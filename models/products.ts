import { InferSchemaType, Schema, model } from "mongoose";
import { z } from "zod";
const product = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    images: {
      type: [{ type: String }],
    },
    category: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Products = model("product", product);

export type TProduct = InferSchemaType<typeof product> & { _id: string };

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  category: z.string(),
  isFeatured: z.boolean().optional(),
});
