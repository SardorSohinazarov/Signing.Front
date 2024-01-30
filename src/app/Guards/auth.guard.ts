import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APIService } from '../Services/api.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(APIService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
