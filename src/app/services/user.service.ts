import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private SERVER_URL: string = "http://localhost:8085/user/";

  registerUser(userDetails): Observable<any> {

    let response;
    return this.httpClient.post(this.SERVER_URL + 'register', userDetails).pipe(

      catchError(this.handleError<any>('registerUser', []))
    );

  }

  login(loginDetails): Observable<any> {

    let response;
    return this.httpClient.post(this.SERVER_URL + 'login', loginDetails).pipe(

      catchError(this.handleError<any>('login', []))
    );

  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  itemValue = new Subject<User>();

  set currentUser(user:any) {
    this.itemValue.next(user);
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  get currentUser(): any {
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  

}
