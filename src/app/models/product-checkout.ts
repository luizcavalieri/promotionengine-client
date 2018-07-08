import {Product} from './product';

export class ProductCheckout extends Product {
  quantity: number;
  barcode: string;
  action: string;
  type: string;
}

// {"quantity":1,"item":{"id":2,"description":"SALTED BEER NUTS","price":1001,"barcode":"123456789101","action":"SALE","type":"UNIT"}}
