import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../user/user';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
    url: string = environment.baseURL;

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


