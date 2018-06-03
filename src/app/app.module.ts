import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';

import { ProductService } from './services/product.service';
import { PromotionService } from './services/promotion.service';
import { MessageService } from './services/message.service';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { AppProductModule } from './modules/checkout/product.module';
import { LazyModule } from './directives/lazy-load/lazy.module';
import {ServiceUtils} from './services/service-utils';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    ServiceWorkerModule
      .register(
        '/ngsw-worker.js',
        {
          enabled: environment.production
        }),
    SharedModuleModule,
    AppProductModule,
    AppProductModule,
    LazyModule,    // Module imported for mocking data easier
    // HttpClientInMemoryWebApiModule.forRoot(
    //     InMemoryDataService, { dataEncapsulation: false }
    // ),
    // InMemoryWebApiModule
  ],
  providers: [
    ProductService,
    MessageService,
    InMemoryDataService,
    PromotionService,
    ServiceUtils
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
