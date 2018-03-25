import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {Product} from '../../models/product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let componentProductList: ProductListComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let fixtureProductList: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        ProductListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    componentProductList = fixtureProductList.componentInstance;
    fixture.detectChanges();
    fixtureProductList.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return ProductListComponent', () => {
    expect(componentProductList).toBeDefined();
  });
});
