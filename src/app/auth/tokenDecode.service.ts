import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class tokenDecodeService {
  

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  getUserIdFromToken(): number  {
    const token = this.getToken();
    if (!token) {
      return 1;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return 1;
    }
  }
}
