import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<UserAuth>('http://localhost:4444/auth/login', {
      username,
      password,
    });
  }

}
