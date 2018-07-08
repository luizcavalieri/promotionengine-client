import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from '../../services/product.service';
import {ProductCheckoutComponent} from "./product-checkout/product-checkout.component";
import {ProductComponent} from "./product.component";

const routes: Routes = [
  {
    path: 'point-sale',
    component: ProductComponent
  },
  {
    path: 'product/:id',
    component: ProductCheckoutComponent
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
