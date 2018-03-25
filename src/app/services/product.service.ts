import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {configs} from '../../util';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  productUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  getProducts(): Observable<Product[]> {
    this.productUrl = configs.API_BASE_URL + 'products';
    console.log(this.productUrl);
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(
          products => this.log(`fetched products`)),
        catchError(
          this.handleError(
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
    this.productUrl = configs.API_BASE_URL + 'product/' + id;

    return this.http.get<Product[]>(this.productUrl)
      .map(products => products.find(product => product.id === id))
      .pipe(
        tap(_ =>
          this.log(
            `fetched product id=${id}`
          )
        ),
        catchError(
          this.handleError<Product[]>(
            `getProduct id=${id}`
          )
        )
      );
  }



  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductServices: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
