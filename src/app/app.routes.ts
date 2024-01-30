import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent, canActivate:[authGuard]},
    {path:'login',component:SignInComponent},
    {path:'register',component:SignUpComponent},
    {path:'**',component:NotFoundComponent},
];
