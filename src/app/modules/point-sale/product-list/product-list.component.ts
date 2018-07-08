import {AfterContentInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {PromotionService} from '../../../services/promotion.service';
import {Promotion} from '../../../models/promotion';

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
  promotionObj: Promotion [];
  @Output() productToCheckout = new EventEmitter<Product>();
  @Output() promotionToCheckout = new EventEmitter<Promotion[]>();

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService
  ) {
  }

  ngOnInit() {
    this.getProducts();
    this.urlBE = configs.BE_BASE_URL;
    // getting promtion engine token.
    this.promotionService.postPromotionToken()
        .subscribe(token => {
          console.log('promotion token', token);
          this.promotionToken = token;
        });
  }

  ngAfterContentInit() {
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
    // adding promotion to point-sale
    this.getPromotions(product);
  }

  getPromotions(product: Product) {
    console.log('this.promotionToken', this.promotionToken);
    return this.promotionService.putPromotion(this.promotionToken, product)
               .subscribe(
                 promotion => console.log('Promotion PUT', product),
                 (err) => console.error(err),
                 () => {
                   this.promotionService.getPromotion(this.promotionToken)
                       .subscribe(
                         promotion => {
                           if (promotion.length > 0) {
                             this.promotionToCheckout.emit(promotion);
                           }
                         }
                       );
                 }
               );
  }

}
