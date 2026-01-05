import { z } from "zod";
import { cartItemInSessionStorageSchema } from "./schema";
import { CartItemSchema } from "./schema/CartSchema";

export type CartItemInSessionStorage = z.infer<typeof cartItemInSessionStorageSchema>;

export type CartItem = z.infer<typeof CartItemSchema>;