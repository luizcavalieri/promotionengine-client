import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../models/promotion';
import {Product} from '../models/product';
import {MessageService} from './message.service';
import {configs} from '../../util';
import {catchError, tap} from 'rxjs/operators';
import {ServiceUtils} from './service-utils';
import {Observable} from 'rxjs';


const promotionUrl = configs.PROMOTION_BASE_API;

// MOCK CONSTANTS
const STORE_ID = '22';
const POS_ID = '11';
const TOKEN_PROMOTION = '8900649c-e710-4076-973c-0d46f57def80';
const bodyBeerNuts = {
    'quantity': 1,
    'item': {
      'id': 2,
      'description': 'SALTED BEER_NUTS',
      'price': 40,
      'barcode': '123456789101',
      'action': 'SALE',
      'type': 'UNIT'
    }
};
const bodyShitPapers = {
  'quantity': 1,
  'item': {
    'id': 2,
    'description': 'TOILET PAPER',
    'price': 30,
    'barcode': '444444444444',
    'action': 'SALE',
    'type': 'UNIT'
  }
};


const bodyPalmeiras = {
  'quantity': 1,
  'item':
    {
      'id': 2,
      'description': 'PALMEIRAS SHIRT',
      'price': 85,
      'barcode': '333333333333',
      'action': 'SALE',
      'type': 'UNIT'
    }
};


@Injectable()
export class PromotionService {
  apiUrl: string;
  body: Product;
  token: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceUtils: ServiceUtils
  ) { }

  postPromotionToken(): Observable<String> {
    this.apiUrl = promotionUrl + STORE_ID + '/' + POS_ID;
    return this.http.post<String>(this.apiUrl, null, this.serviceUtils.httpOptionsText)
               .pipe(
                 tap(_ =>
                       this.serviceUtils.log(
                         `fetched postPromotionToken ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<String>(
                     `postPromotionToken`
                   )
                 )
               );
  }

  putPromotion(promotionToken): Observable<Promotion> {
    this.apiUrl = promotionUrl + promotionToken;
    return this.http.put<Promotion>(this.apiUrl, bodyBeerNuts, this.serviceUtils.httpOptionsJSON)
               .pipe(
                 tap(_ =>
                       this.serviceUtils.log(
                         `fetched putPromotion ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<Promotion>(
                     `putPromotion`
                   )
                 )
               );
  }

  getPromotion(promotionToken): Observable<Promotion | String> {
    this.apiUrl = promotionUrl + promotionToken;
    return this.http.get<Promotion | String>(this.apiUrl)
               .pipe(
                 tap(_ =>
                       this.serviceUtils.log(
                         `fetched getPromotion ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<String>(
                     `getPromotion`
                   )
                 )
               );
  }
}
