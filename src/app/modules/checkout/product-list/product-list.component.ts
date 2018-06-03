import {AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {HttpClientModule} from '@angular/common/http';
import {configs} from '../../../../util';
import {Observable} from "rxjs/Observable";
import {PromotionService} from '../../../services/promotion.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterContentInit {
  products: Product[];
  urlBE: string;
  productDetail: Product;
  @Output() productToCheckout = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.urlBE = configs.BE_BASE_URL;
  }

  ngAfterContentInit () {
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        products => this.products = products);
  }

  getProductDetail(product): void {
    this.productDetail = product;
  }

  addProductCheckout(product: Product) {
    this.productToCheckout.emit(product);
    this.promotionService.getPromotionToken().subscribe(token => console.log(token));
  }

}
