import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { catchError, map, throwError } from 'rxjs';
import { UserRegister } from '../user/userRegister';
import { UserLogin } from '../user/userLogin';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    url: string = environment.baseURL;


    login(user: UserLogin){
      return this.http.post<UserAuth>(`${this.url}login`, user).pipe(
        map((userAuth: UserAuth) => {
          localStorage.setItem('jwtToken', userAuth.jwtToken);
          localStorage.setItem('refreshToken', userAuth.refreshToken);
          return userAuth;
        }),
        catchError(this.handleError)
      );
    } 

  register(user: UserRegister){
    return this.http.post<UserRegister>(`${this.url}register`, user, {responseType: 'text' as 'json'}).pipe(
      catchError(this.handleError)
    );
    };

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        if (typeof error.error === 'string') {
          errorMessage = error.error; // Capturar mensaje de error en texto plano
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message; // Capturar mensaje de error en JSON
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      
      return throwError(() => errorMessage);
    }
  
  }


