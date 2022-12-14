// type and category to be extended after adding products to products.json
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: ProductCategory;
  type: string;
  preview: string;
  images: string[];
}

export type ProductCategory = 'Полезные сладости' | 'Полезные напитки' | 'Свечи';

// export type ProductType = 'батончик' | 'печенье';
