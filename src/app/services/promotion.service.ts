import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promotion } from '../models/promotion';
import {Product} from '../models/product';
import {MessageService} from './message.service';
import {configs} from '../../util';
import {catchError, tap} from 'rxjs/operators';
import {
  ServiceUtils,
  httpOptionsJSON,
  httpOptionsOCTEL
} from './service-utils';
import {Observable} from 'rxjs/Observable';

const promotionUrl = configs.PROMOTION_BASE_API;
const storeId = '22';
const POSId = '11';
const tokenPromotion = 'e45cd651-3550-46e0-917c-510ee41c86bd';

@Injectable()
export class PromotionService {
  apiUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private serviceUtils: ServiceUtils
  ) { }

  getPromotionToken(): Observable<String> {
    this.apiUrl = promotionUrl + storeId + '/' + POSId;
    return this.http.post<String>(this.apiUrl, null, httpOptionsOCTEL )
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

  getPromotion(): Observable<Promotion> {
    this.apiUrl = promotionUrl + tokenPromotion;
    return this.http.put<Promotion>(this.apiUrl, null, httpOptionsJSON )
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

}
