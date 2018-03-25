import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Extra Modules.
import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LazyModule} from '../directives/lazy-load/lazy.module';

// Custom created modules.

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    LazyModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    LazyModule
  ],
  declarations: []
})
export class SharedModuleModule { }
