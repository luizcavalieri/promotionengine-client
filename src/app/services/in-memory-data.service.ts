import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description product 1',
        price: 10.75,
        image: '../assets/images/product1.png'
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description product 2',
        price: 25.50,
        image: '../assets/images/product2.png'
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description product 3',
        price: 5.20,
        image: '../assets/images/product3.png'
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description product 4',
        price: 28.15,
        image: '../assets/images/product4.png'
      },
      {
        id: 5,
        name: 'Product 5',
        description: 'Description product 5',
        price: 12.00,
        image: '../assets/images/product5.png'
      },
      {
        id: 6,
        name: 'Product 6',
        description: 'Description product 6',
        price: 9.90,
        image: '../assets/images/product6.png'
      },
      {
        id: 7,
        name: 'Product 7',
        description: 'Description product 7',
        price: 15.40,
        image: '../assets/images/product7.png'
      },
      {
        id: 8,
        name: 'Product 8',
        description: 'Description product 8',
        price: 7.45,
        image: '../assets/images/product8.png'
      },
      {
        id: 9,
        name: 'Product 9',
        description: 'Description product 9',
        price: 8.25,
        image: '../assets/images/product9.png'
      }
    ];
    return {products};
  }
}
