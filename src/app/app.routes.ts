import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'login',component:SignInComponent},
    {path:'register',component:SignUpComponent},
    {path:'**',component:NotFoundComponent},
];
