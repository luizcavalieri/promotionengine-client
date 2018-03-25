import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {configs} from '../../../../util';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail$: Observable<Product | Product[]>;
  urlBE: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.getProductDetail();
  }

  ngOnInit() {
    this.urlBE = configs.BE_BASE_URL;
  }

  getProductDetail(): void {
    this.productDetail$ = this.route.paramMap
      .switchMap(
        (params: ParamMap) =>
      this.productService
        .getProduct(
          params.get('id')
        )
      );
  }

  backToProductList(): void {
    this.router.navigate(['/product-list']);
  }

}
