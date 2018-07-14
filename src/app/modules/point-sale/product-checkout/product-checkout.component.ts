import {Component, DoCheck, Input, IterableDiffers, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {PromotionService} from '../../../services/promotion.service';
import {Benefits} from '../../../models/benefits';
import {EBenefit} from '../../../models/EBenefit';
import {ProductCheckout} from '../../../models/product-checkout';

@Component({
             selector: 'app-product-checkout',
             templateUrl: './product-checkout.component.html',
             styleUrls: ['./product-checkout.component.scss']
           })
export class ProductCheckoutComponent implements OnInit, DoCheck {
  @Input() promotionListCheckout: Benefits[];
  @Input() productListCheckout: ProductCheckout[];
  @Input() productToCheckout: Product;
  urlBE: string;
  displayedColumns = ['name', 'description', 'quantity', 'price'];
  productArrayCount: ProductCheckout[] = [];
  dataSource = new MatTableDataSource(this.productArrayCount);
  differ: any;
  grandTotal: number;
  discount: number;
  total: number;
  quantity: number;
  promotionToken: String;
  promotionObj: Benefits;
  benefit = EBenefit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public promotionService: PromotionService,
    private differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
    this.grandTotal = 0;
    this.total = 0;
    this.quantity = 0;
    this.discount = 0;
  }

  ngOnInit(): void {
    this.urlBE = configs.BE_BASE_URL;
    this.dataSource = new MatTableDataSource(this.productArrayCount);
  }

  ngDoCheck(): void {
    this.checkPromotion();+
      console.log('ProductToChekcout', this.productToCheckout);
    if (this.promotionListCheckout) { console.log(this.promotionListCheckout); }
    if (this.productToCheckout) { console.log('ProductToChekcout', this.productToCheckout); }
  }

  addProductToCheckout(): void {
    this.productArrayCount = [];
    let previousItem: Product;
    const productArrSorted = this.productListCheckout.sort((a: any, b: any) => a.id - b.id);

    productArrSorted.map(item => {
      if (previousItem !== undefined) {
        if (item.id === previousItem.id) {
          this.productArrayCount.pop();
          item.quantity++;
        } else { item.quantity = 1; }
      } else { item.quantity = 1; }
      this.productArrayCount.push(item);
      previousItem = item;
    });
    this.dataSource = new MatTableDataSource(this.productArrayCount);
  }

  checkPromotion(product?: ProductCheckout): void {
    if (this.promotionListCheckout && this.promotionListCheckout.length) {
      this.promotionListCheckout.map(promotion => {
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

      this.addProductToCheckout();
      this.getTotals();
    }
  }

  getTotals(): void {
    this.total = 0;
    this.quantity = 0;
    for (const item of this.productArrayCount) {
      this.total = this.total + (item.quantity * item.price);
      this.quantity = this.quantity + item.quantity;
    }
  }
}
