import {Component, DoCheck, Input, IterableDiffers, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {PromotionService} from '../../../services/promotion.service';
import {Promotion} from '../../../models/promotion';

@Component({
             selector: 'app-product-checkout',
             templateUrl: './product-checkout.component.html',
             styleUrls: ['./product-checkout.component.scss']
           })
export class ProductCheckoutComponent implements OnInit, DoCheck {
  @Input() productListCheckout: Product[];
  @Input() productToCheckout: Product;
  urlBE: string;
  displayedColumns = ['name', 'description', 'quantity', 'price'];
  productArrayCount: Product[] = [];
  dataSource = new MatTableDataSource(this.productArrayCount);
  differ: any;
  grandTotal: number = 0;
  discount: number = 0;
  total: number = 0;
  quantity: number = 0;
  promotionToken: String;
  promotionObj: Promotion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public promotionService: PromotionService,
    private differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit(): void {
    this.urlBE = configs.BE_BASE_URL;
    this.dataSource = new MatTableDataSource(this.productArrayCount);
  }

  ngDoCheck(): void {
    this.addProductToCheckout();
    this.getTotals();
  }

  addProductToCheckout(): void {
    this.productArrayCount = [];
    let previousItem: Product;
    const productArrSorted =
      this.productListCheckout
          .sort((a: any, b: any) => {
            return a.id - b.id;
          });

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
    this.dataSource = new MatTableDataSource(this.productArrayCount);
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
