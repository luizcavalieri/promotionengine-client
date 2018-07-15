import {AfterContentInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {PromotionService} from '../../../services/promotion.service';
import {Benefits} from '../../../models/benefits';
import {ProductCheckout} from '../../../models/product-checkout';

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
  promotionList: Benefits[];
  @Output() productToCheckout = new EventEmitter<Product>();
  @Output() promotionToCheckout = new EventEmitter<Benefits[]>();
  @Output() productItem: Product;

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.urlBE = configs.BE_BASE_URL;
    // getting promtion engine token.
    this.promotionService.postPromotionToken()
        .subscribe(token => {
          this.promotionToken = token;
        });
  }

  ngAfterContentInit(): void { }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe(
          products => this.products = products);
  }

  getPromotions(product: Product) {
    return this.promotionService.putPromotion(this.promotionToken, product)
               .subscribe(
                 _ => console.log('product', product),
                 (err) => console.error(err),
                 () => {
                   this.promotionService.getPromotion(this.promotionToken)
                       .subscribe(
                         promotion => {
                           if (promotion.length > 0) {
                             this.promotionToCheckout.emit(promotion);
                             this.promotionList = promotion;
                           }
                         }
                       );
                 }
               );
  }

  addProductCheckout(product: Product) {
    this.productToCheckout.emit(product);
    this.productItem = product;
    // adding promotion to point-sale
    this.getPromotions(product);
  }

  checkPromotion(product?: ProductCheckout): void {
    if (this.promotionList && this.promotionList.length) {
      this.promotionList.map(promotion => {
        if (promotion.AmountOffCart) {
          // console.log('AmountOffCart', promotion.AmountOffCart.amountOff);
          // apply promotion to total
        }
        if (promotion.AmountOffItem) {
          // console.log('AmountOffItem', promotion.AmountOffItem.amountOff);
          //  apply promotion to product price
        }
        if (promotion.PercentageOffCart) {
          // console.log('PercentageOffCart', promotion.PercentageOffCart.percentage);
          // apply percentage to cart
        }
        if (promotion.PercentageOffItem) {
          // console.log('PercentageOffItem', promotion.PercentageOffItem.percentage);
          //  apply percentage to procuct price
        }
        if (promotion.Gift) {
          // console.log('Gift', promotion.Gift);
          //  show message for gift
        }
        if (promotion.ItemFree) {
          // console.log('ItemFree', promotion.ItemFree);
          // make product price to zero
        }
        if (promotion.FixedPrice) {
          // console.log('FixedPrice', promotion.FixedPrice.newPrice);
          //  change price of product
        }
        if (promotion.Coupon) {
          // console.log('Coupon', promotion.Coupon);
          //  if coupon added check the discount related to that
        }
        if (promotion.Point) {
          // console.log('Point', promotion.Point.points);
          // count loyalty points
        }
      });

    }
  }

}
