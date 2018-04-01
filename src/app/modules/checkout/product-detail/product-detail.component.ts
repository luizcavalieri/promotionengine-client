import {Component, DoCheck, Input, IterableDiffers, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
             selector: 'app-product-detail',
             templateUrl: './product-detail.component.html',
             styleUrls: ['./product-detail.component.scss']
           })
export class ProductDetailComponent implements OnInit, DoCheck {
  urlBE: string;
  displayedColumns = ['name', 'description', 'quantity', 'price'];
  @Input() productListCheckout: Product[];
  productArrayCount: Product[] = [];
  dataSource = new MatTableDataSource(this.productArrayCount);
  differ: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
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
    const productArrSorted =
      this.productListCheckout
          .sort((a: any, b: any) => {
            return a.id - b.id;
          });

    for (const item of productArrSorted) {
      if (previousItem !== undefined) {
        if (item.id === previousItem.id) {
          this.productArrayCount.pop();
          item.count++;
        } else {
          item.count = 1;
        }
      } else {
        item.count = 1;
      }
      this.productArrayCount.push(item);
      previousItem = item;
    }
    this.dataSource = new MatTableDataSource(this.productArrayCount);
  }
}
