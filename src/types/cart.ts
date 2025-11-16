import { Product } from "./product";

export interface CartItemInSessionStorage {
  id: string;
  quantity: number;
  variant: { size: string; price: number };
}

export interface CartItem extends Product {
  orderQuantity: number;
  variant: { size: string; price: number };
}
