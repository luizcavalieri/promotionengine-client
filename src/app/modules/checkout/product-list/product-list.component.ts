import {AfterContentInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
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
  promotionToken: String;
  @Output() productToCheckout = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService
  ) {
  }

  ngOnInit() {
    this.getProducts();
    this.urlBE = configs.BE_BASE_URL;
    // getting promtion engine token.
    this.promotionService.getPromotionToken()
        .subscribe(token => {
          console.log('promotion token', token);
          this.promotionToken = token;
        });
  }

  ngAfterContentInit() { }

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
    this.promotionService.putPromotion(this.promotionToken)
        .subscribe(
          promotion => console.log('Promotion PUT')
        );

    this.promotionService.getPromotion()
        .subscribe(
          promotion => console.log('Promotion Obj', promotion)
        );
  }

}
