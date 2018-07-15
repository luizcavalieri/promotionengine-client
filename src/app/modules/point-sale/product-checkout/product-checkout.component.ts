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
    this.addProductToCheckout();
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
        } else {
          item.quantity = 1;
        }
      } else {
        item.quantity = 1;
      }
      this.productArrayCount.push(item);
      previousItem = item;
    });
    this.getTotals();
    this.dataSource = new MatTableDataSource(this.productArrayCount);
  }

  checkPromotion(product?: ProductCheckout) {
    if (this.promotionListCheckout && this.promotionListCheckout.length) {
      let isPromotionAlreadyApplied = false;
      this.promotionListCheckout.forEach(promotion => {
        if (promotion.AmountOffCart) {
          // apply promotion to total
        }
        if (promotion.AmountOffItem) {
          //  apply promotion to product price
          if (product.barcode === promotion.AmountOffItem.itemKey && !isPromotionAlreadyApplied) {
            product.price = product.price - promotion.AmountOffItem.amountOff;
            isPromotionAlreadyApplied = true;
          }
        }
        if (promotion.PercentageOffCart) {
          // apply percentage to cart
        }
        if (promotion.PercentageOffItem) {
          //  apply percentage to procuct price
          if (product.barcode === promotion.PercentageOffItem.itemKey && !isPromotionAlreadyApplied) {
            product.price = product.price - (product.price * promotion.PercentageOffItem.percentage);
            isPromotionAlreadyApplied = true;
          }
        }
        if (promotion.Gift) {
          //  show message for gift
        }
        if (promotion.ItemFree) {
          // make product price to zero
          if (product.barcode === promotion.ItemFree.itemKey && !isPromotionAlreadyApplied) {
            product.price = 0;
            isPromotionAlreadyApplied = true;
          }
        }
        if (promotion.FixedPrice) {
          //  change price of product
          if (product.barcode === promotion.FixedPrice.itemKey && !isPromotionAlreadyApplied) {
            product.price = promotion.FixedPrice.newPrice;
            isPromotionAlreadyApplied = true;
          }
        }
        if (promotion.Coupon) {
          //  if coupon added check the discount related to that
        }
        if (promotion.Point) {
          // count loyalty points
        }
      });
      return product;
    }
  }

  getTotals(): void {
    this.total = 0;
    this.quantity = 0;
    for (const item of this.productArrayCount) {
      const product = item;
      const productDiscounted = this.checkPromotion(product);
      this.total = this.total + (item.quantity * item.price);
      this.quantity = this.quantity + item.quantity;
    }
  }
}
