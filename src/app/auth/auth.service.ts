import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: UserRegister){
    return this.http.post<UserRegister>('http://localhost:4444/auth/register', user, {responseType: 'text' as 'json'});
    };

  }


