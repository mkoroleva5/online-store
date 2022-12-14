import { ProductCard } from './components/productCard/ProductCard';
import { Product } from './data/product';

const data: Product = {
  id: 1,
  title: 'Батончик с протеином «Мята» Bite',
  description:
    'Bite Мята — натуральный орехово-фруктовый батончик без сахара. В составе отборные орехи, фрукты, ягоды и много протеина. Для оригинального вкуса мы добавили ароматную мяту — в сочетании с абрикосом и миндалем получился насыщенный протеиновый снек, который удобно взять с собой и забыть о голоде на несколько часов!  Абсолютно натуральный. Без сахара, без глютена. Не содержит ГМО, молоко и сою. Подходит для диабетиков.',
  price: 4.09,
  stock: 21,
  brand: 'Bite',
  category: 'Полезные сладости',
  type: 'батончик',
  preview:
    'https://raw.githubusercontent.com/mkoroleva5/online-store-content/main/media/small/1.jpg',
  images: [
    'https://raw.githubusercontent.com/mkoroleva5/online-store-content/main/media/full/1.jpg',
    'https://raw.githubusercontent.com/mkoroleva5/online-store-content/main/media/artistic/1-and-6.jpg',
  ],
};

export const App = () => {
  return (
    <div>
      <ProductCard
        title={data.title}
        stock={data.stock}
        price={data.price}
        preview={data.preview}
      />
    </div>
  );
};
