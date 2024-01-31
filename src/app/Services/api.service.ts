import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private payload: any;

  constructor(private httpClient: HttpClient,private router:Router) 
  {
    this.payload = this.decodeToken();

    // console.log(this.payload)
  }

  Login(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Login",data)
  }

  Register(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Register",data)
  }

  storeAccessToken(token:string){
    localStorage.setItem('AccessToken',token)
  }

  getToken(){
    return localStorage.getItem('AccessToken')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('AccessToken');
  }

  signOut(){
    localStorage.removeItem('AccessToken')
    this.router.navigate(["/login"])
  }

  getAllUsers(){
    return this.httpClient.get<User[]>("https://localhost:7134/api/Auth/GetAllUsers");
  }

  decodeToken(){
    const jwtHalper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHalper.decodeToken(token))
    return jwtHalper.decodeToken(token);
  }

  getEmail(){
    if(this.payload)
      return this.payload.Email;
  }
}

