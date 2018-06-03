import {Product} from './product';

export class ProductCheckout extends Product {
  count: number;
  barCode: string;
  action: string;
  type: string;
}
