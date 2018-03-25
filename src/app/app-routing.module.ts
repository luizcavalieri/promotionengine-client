import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';

import {ProductService} from './services/product.service';

const indexRoute: Route = {
  path: '',
  redirectTo: '/checkout-list',
  pathMatch: 'full'
};

const routes: Routes = [
  indexRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductService]
})
export class AppRoutingModule { }
