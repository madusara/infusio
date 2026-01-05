import z from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  variants: z.array(z.object({
    size: z.string(),
    price: z.number(),
  })),
  image: z.string(),
});