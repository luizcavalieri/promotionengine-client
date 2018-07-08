import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Promotion} from '../../models/promotion';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productToCheckout: Product;
  @Input() promotionToCheckout: Promotion[];
  @Output() productListAdded = new EventEmitter<Product[]>() ;
  @Output() productAdded = new EventEmitter<Product>() ;
  @Output() promotions = new EventEmitter<Promotion[]>() ;
  productBasket: Product[];

  constructor() {
    this.productBasket = [];
  }

  ngOnInit(): void { }

  addProduct(productToCheckout: Product) {
    this.productBasket.push(productToCheckout);
    this.productListAdded.emit(this.productBasket);
    this.productAdded.emit(productToCheckout);
  }

  addPromotion(promotionToCheckout: Promotion[]) {
    this.promotions.emit(promotionToCheckout);
  }

}
