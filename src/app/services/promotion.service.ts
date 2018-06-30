import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../models/promotion';
import {Product} from '../models/product';
import {MessageService} from './message.service';
import {configs} from '../../util';
import {catchError, tap} from 'rxjs/operators';
import {
  httpOptionsText,
  httpOptionsJSON,
  httpOptionsOCTEL,
  ServiceUtils,
  httpPostOptionsText
} from './service-utils';
import {Observable} from 'rxjs/Observable';


const promotionUrl = configs.PROMOTION_BASE_API;
const storeId = '22';
const POSId = '11';
const tokenPromotion = '8900649c-e710-4076-973c-0d46f57def80';

@Injectable()
export class PromotionService {
  apiUrl: string;
  body: Product;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceUtils: ServiceUtils
  ) { }

  getPromotionToken(): Observable<String> {
    this.apiUrl = promotionUrl + storeId + '/' + POSId;
    return this.http.post<String>(this.apiUrl, null, httpPostOptionsText)
       .pipe(
         tap(_ =>
               this.serviceUtils.log(
                 `fetched promtionToken ${_}`
               )
         ),
         catchError(
           this.serviceUtils.handleError<String>(
             `getPromotionToken`
           )
         )
       );
  }

  putPromotion(promotionToken): Observable<Promotion> {
    this.apiUrl = promotionUrl + promotionToken;
    const body = {
      'body': {
        'quantity': 1,
        'item': {
          'id': 2,
          'description': 'SALTED BEER_NUTS',
          'price': 1001,
          'barcode': '123456789101',
          'action': 'SALE',
          'type': 'UNIT'
        }
      }
    };

    return this.http.put<Promotion>(this.apiUrl, body.body, httpOptionsJSON )
       .pipe(
         tap(_ =>
               this.serviceUtils.log(
                 `fetched promtionToken ${_}`
               )
         ),
         catchError(
           this.serviceUtils.handleError<Promotion>(
             `getPromotion`
           )
         )
       );
  }

  getPromotion(): Observable<Promotion | String> {
    return this.http.get<Promotion | String>(this.apiUrl)
       .pipe(
           tap(_ =>
                 this.serviceUtils.log(
                   `fetched promtionToken ${_}`
                 )
           ),
           catchError(
             this.serviceUtils.handleError<String>(
               `getPromotionToken`
             )
           )
         );
  }
}
