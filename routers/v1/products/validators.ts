import { z } from "zod";

export const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  category: z.string(),
  isFeatured: z.boolean().optional(),
});
