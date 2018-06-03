import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

export const httpOptionsJSON = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
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

  constructor(
    private messageService: MessageService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
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
  public handleError<T> (operation = 'operation', result?: T) {
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
