import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {SharedModuleModule} from "../../shared-module/shared-module.module";
import { ProductComponent } from './product.component';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModuleModule
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  exports: [ProductComponent]
})
export class AppProductModule { }




