export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  catPath: string;
  type: string;
  preview: string;
  images: string[];
}

export interface CartProduct extends Product {
  amount: number;
}
