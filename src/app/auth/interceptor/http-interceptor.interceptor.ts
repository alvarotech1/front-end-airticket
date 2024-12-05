import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { refreshTokenService } from '../refreshToken.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const excludedUrls = ['/register', '/login','/refresh-token'];
  const refreshService = inject(refreshTokenService);
  
 
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); 
  }
  

  const myToken = localStorage.getItem('jwtToken');
  console.log(myToken);
  if(myToken){
    const cloneRequest = req.clone({
    setHeaders:{
      Authorization:`Bearer ${myToken}`
    }
  });
    return next(cloneRequest).pipe(catchError((err)=> {
      return refreshService.refreshToken().pipe(
        switchMap((res)=>{
          localStorage.setItem('jwtToken', res.accessToken);
          const newReq = req.clone({
            setHeaders:{
              Authorization: `Bearer ${res.accessToken}`
            }
          });
          return next(newReq);
        }),
        catchError((refreshErr)=>{
          const finalError = new Error(refreshErr);
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('refreshToken');
          return throwError(()=> finalError);
        })
      )
    }));
}
  return next(req);
};
