import {Component, Input, EventEmitter, Output, OnInit, DoCheck} from '@angular/core';
import {Product} from '../../models/product';
import {Benefits} from '../../models/benefits';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck {
  @Input() promotionToCheckout: Benefits[];

  @Output() productListAdded = new EventEmitter<Product[]>() ;
  @Output() promotions = new EventEmitter<Benefits[]>() ;
  @Output() productAdded: Product;

  productBasket: Product[];
  promotionList: Benefits[];
  title: string;

  constructor() {
    this.productBasket = [];
    this.title = 'Point of Sale';
  }

  ngOnInit(): void { }

  ngDoCheck(): void { }

  addProduct(productToCheckout: Product) {
    this.productBasket.push(productToCheckout);
    this.productListAdded.emit(this.productBasket);
    this.productAdded = productToCheckout;
  }

  addPromotion(promotionToCheckout: Benefits[]) {
    this.promotions.emit(promotionToCheckout);
    this.promotionList = promotionToCheckout;
  }

}
