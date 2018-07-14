import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {configs} from '../../util';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';
import {ServiceUtils} from './service-utils';

const SERVICE = 'ProductService';

@Injectable()
export class ProductService {
  productUrl: any;

  constructor(
    private http: HttpClient,
    private serviceUtils: ServiceUtils
    ) { }

  getProducts(): Observable<Product[]> {
    this.productUrl = configs.BE_MOCK_BASE_URL + 'products';
    // this.productUrl = configs.API_BASE_URL;
    // this.productUrl = products;
    // console.log(this.productUrl);
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(
          productList => this.serviceUtils.log(
            SERVICE,
            `fetched products`,
            productList
          )),
        catchError(
          this.serviceUtils.handleError(
            SERVICE,
            'getProducts',
            []
          ))
      );
  }

  /**
   *
   * @param id: selected product id.
   *
   * */
  getProduct(id: string): Observable<Product | Product[]> {
    this.productUrl = configs.BE_MOCK_BASE_URL + 'products/' + id;
    // this.productUrl = products;
    return this.http.get<Product[]>(this.productUrl)
    // line commented as in-memory-database library does the job automatically on mock data.
    //   .map(products => products.find(product => product.id === id))
      .pipe(
        tap(_ =>
          this.serviceUtils.log(
            SERVICE,
            `fetched product id=${id}`,
            _
          )
        ),
        catchError(
          this.serviceUtils.handleError<Product[]>(
            SERVICE,
            `getProduct id=${id}`
          )
        )
      );
  }




}
