import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { APIService } from '../Services/api.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const authService = inject(APIService);
  const myToken = authService.getToken();
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
          router.navigate(['login'])
        }
      }
      return throwError(() => new Error("Nimadur xato ketdida"));
    })
  );
};
