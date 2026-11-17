export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  image?: string;
  description: string;
};

export const products: Product[] = [
  // Пример товара:
  // {
  //   id: '1',
  //   title: 'Витамин C',
  //   category: 'Витамины',
  //   price: 250,
  //   image: '/assets/product1.jpg',
  //   description: 'Описание товара',
  // },
];
