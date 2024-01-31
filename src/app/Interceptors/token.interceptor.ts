import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { APIService } from '../Services/api.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { animate } from '@angular/animations';
import { Token } from '../Interfaces/token';

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const authService = inject(APIService);
  const myToken = authService.getAccessToken();
  const router = inject(Router)

  if(myToken){
    req = req.clone({
      setHeaders:({Authorization:`Bearer ${myToken}`})
    })
  }
  return next(req).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          let token = new Token()
          
          token.accessToken = authService.getAccessToken()!;
          token.refreshToken = authService.getRefreshToken()!;

          return authService.refreshToken(token)
            .pipe(
              switchMap((data:Token) => {
                authService.storeToken(data.accessToken,data.refreshToken);
                req = req.clone({
                  setHeaders:({Authorization:`Bearer ${data.accessToken}`})
                })
                return next(req)
              }),
              catchError((err) =>{
                return throwError(()=>{
                  alert("Token expired")
                  router.navigate(['/login'])
                })
              })
            )
        }
      }
      return throwError(() => new Error("Nimadur xato ketdida"));
    })
  );
};