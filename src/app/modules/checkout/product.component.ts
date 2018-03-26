import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productToCheckout: Product;
  @Output() productAdded = new EventEmitter<Product[]>() ;
  productBasket: Product[];

  constructor() {
    this.productBasket = [];
  }

  ngOnInit(): void { }

  addProduct(productToCheckout: Product) {
    this.productBasket.push(productToCheckout);
    this.productAdded.emit(this.productBasket);
    console.log(this.productBasket);
  }

}
