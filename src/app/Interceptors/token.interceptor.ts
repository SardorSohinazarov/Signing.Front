import { HttpInterceptorFn } from '@angular/common/http';
import { APIService } from '../Services/api.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(APIService);
  const myToken = authService.getToken();

  if(myToken){
    req = req.clone({
      setHeaders:({Authorization:`Bearer ${myToken}`})
    })
  }
  return next(req);
};
