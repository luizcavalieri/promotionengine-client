import {Component, DoCheck, Input, IterableDiffers, OnInit} from "@angular/core";
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {MatTableDataSource} from '@angular/material';
import {forEach} from "@angular/router/src/utils/collection";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, DoCheck {
  productDetail$: Observable<Product | Product[]>;
  productDetail: Product;
  urlBE: string;
  displayedColumns = ['name', 'description', 'quantity', 'price'];
  @Input() productListCheckout: Product[];
  dataSource = new MatTableDataSource(this.productListCheckout);
  differ: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit(): void {
    this.urlBE = configs.BE_BASE_URL;
    this.dataSource = new MatTableDataSource(this.productListCheckout);
  }

  ngDoCheck(): void {
    this.addProductToCheckout();
  }

  addProductToCheckout(): void{
    this.dataSource = new MatTableDataSource(this.productListCheckout);
  }

  getProductQuantity(): void {
    for (const item of this.productListCheckout) {
      const id = item.id;
    }
  }
}
