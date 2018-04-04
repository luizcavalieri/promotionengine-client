import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from '../../services/product.service';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductComponent} from "./product.component";

const routes: Routes = [
  {
    path: 'product-checkout',
    component: ProductComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductRoutingModule { }
