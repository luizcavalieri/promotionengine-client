import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Benefits} from '../models/benefits';
import {Product} from '../models/product';
import {MessageService} from './message.service';
import {configs} from '../../util';
import {catchError, tap} from 'rxjs/operators';
import {ServiceUtils} from './service-utils';
import {Observable} from 'rxjs';


const promotionUrl = configs.PROMOTION_BASE_API;
const SERVICE = 'PromotionService';

// MOCK CONSTANTS
const STORE_ID = '22';
const POS_ID = '11';
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
                         SERVICE,
                         `fetched postPromotionToken ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<String>(
                     SERVICE,
                     `postPromotionToken`
                   )
                 )
               );
  }

  putPromotion(promotionToken, product): Observable<Benefits> {
    this.apiUrl = promotionUrl + promotionToken;
    const productBody = {
      'quantity': 1,
      'item': {
        id: product.id,
        description: product.description,
        price: product.price,
        barcode: product.barcode,
        action: product.action,
        type: product.type
      }
    };
    console.log(productBody);
    return this.http.put<Benefits>(this.apiUrl, productBody, this.serviceUtils.httpOptionsJSON)
               .pipe(
                 tap(_ =>
                       this.serviceUtils.log(
                         SERVICE,
                         `fetched putPromotion ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<Benefits>(
                     SERVICE,
                     `putPromotion`
                   )
                 )
               );
  }

  getPromotion(promotionToken): Observable<Benefits[]> {
    this.apiUrl = promotionUrl + promotionToken;
    return this.http.get<Benefits[]>(this.apiUrl)
               .pipe(
                 tap(_ =>
                       this.serviceUtils.log(
                         SERVICE, `fetched getPromotion ${_}`
                       )
                 ),
                 catchError(
                   this.serviceUtils.handleError<Benefits[]>(
                     SERVICE,
                     `getPromotion`
                   )
                 )
               );
  }
}
