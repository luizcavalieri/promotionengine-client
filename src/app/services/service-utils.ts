import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

export const httpOptionsJSON = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    })
};

const header = new HttpHeaders({'Content-Type': 'text/plain'});

export const httpHeaderText = {
  headers: header,
};

export const httpOptionsText = {
  headers: header,
  responseType: 'text'
};

export const httpOptionsOCTEL = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/octet-stream'
    })
};

@Injectable()
export class ServiceUtils {
  httpOptions: any;
  httpOptionsText: Object;
  httpHeaderText: Object;
  httpOptionsOCTEL: Object;
  httpOptionsJSON: Object;

  constructor(
    private messageService: MessageService) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        })
    };
    this.httpOptionsText = {
      headers: header,
      responseType: 'text'
    };
    this.httpHeaderText = {
      headers: header
    };
    this.httpOptionsOCTEL = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/octet-stream'
        })
    };
    this.httpOptionsJSON = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        })
    };
  }

  /** Log a ProductService message with the MessageService */
  public log(message: string) {
    this.messageService.add('ProductServices: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
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
