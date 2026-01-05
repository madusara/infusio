import z from "zod";
import { ProductSchema } from "./ProductSchema";

export const cartItemInSessionStorageSchema = z.object({
    id: z.string(),
    quantity: z.number().int().positive(),
    variant: z.object({
      size: z.string(),
      price: z.number().positive(),
    }),
  });

  export const CartItemSchema = ProductSchema.extend({
    orderQuantity: z.number(),
    variant: z.object({
      size: z.string(),
      price: z.number(),
    }),
  });