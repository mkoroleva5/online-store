import { CartProduct } from '../data/product';

export interface CartState {
  products: Record<number, CartProduct>;
  promos: Record<string, number>;
  isCheckout: boolean;
}
