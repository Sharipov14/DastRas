import { Product } from "./product.model";

export interface ICartItem {
  product: Product;
  quantity: number;
}