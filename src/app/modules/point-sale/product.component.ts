import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Benefits} from '../../models/benefits';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productToCheckout: Product;
  @Input() promotionToCheckout: Benefits[];
  @Output() productListAdded = new EventEmitter<Product[]>() ;
  @Output() productAdded = new EventEmitter<Product>() ;
  @Output() promotions = new EventEmitter<Benefits[]>() ;
  productBasket: Product[];
  promotionList: Benefits[];
  title: string;

  constructor() {
    this.productBasket = [];
    this.title = 'Point of Sale Test fgf';
  }

  ngOnInit(): void { }

  addProduct(productToCheckout: Product) {
    this.productBasket.push(productToCheckout);
    this.productListAdded.emit(this.productBasket);
    this.productAdded.emit(productToCheckout);
  }

  addPromotion(promotionToCheckout: Benefits[]) {
    this.promotions.emit(promotionToCheckout);
    this.promotionList = promotionToCheckout;
  }

}
