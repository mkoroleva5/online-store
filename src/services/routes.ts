import products from '../data/products.json';

export const categoryRoutes = [...new Set(products.map((prod) => prod.catPath))];

export const productRoutes = products.map((prod) => [prod.catPath, prod.id]);
