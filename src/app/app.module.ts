import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';

import { ProductService } from './services/product.service';
import { MessageService } from './services/message.service';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { AppProductModule } from './modules/checkout/product.module';
import { LazyModule } from './directives/lazy-load/lazy.module';

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
    ServiceWorkerModule
      .register(
        '/ngsw-worker.js',
        {
          enabled: environment.production
        }),
    SharedModuleModule,
    AppProductModule,
    AppProductModule,
    LazyModule,
  ],
  providers: [
    ProductService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
