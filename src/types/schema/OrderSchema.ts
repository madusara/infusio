import z from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  notes: z.string(),
  userEmail: z.string(),
  items: z.array(z.object({
    id: z.string(),
    variant: z.object({
      size: z.string(),
      price: z.number(),
    }),
    quantity: z.number(),
  })),
  address: z.object({
    name: z.string(),
    email: z.string(),
    phone1: z.string(),
    phone2: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    district: z.string(),
  }),
  paymentMethod: z.enum(["cod", "card", "bank_transfer"]),
  totalAmount: z.number(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});