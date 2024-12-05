import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
  })
  export class refreshTokenService{
    private url = environment.baseURL;

    constructor(private http: HttpClient,private authService: AuthService){}

    refreshToken(){
        const refreshToken = this.getRefreshToken();
        return this.http.post<any>(`${this.url}refreshToken`, {refreshToken});
    }

    getToken(){
        return localStorage.getItem('jwtToken');
    }

    getRefreshToken(){
        return localStorage.getItem('refreshToken');
    }
      
  } 