import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../Interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private payload: any;

  constructor(private httpClient: HttpClient,private router:Router) 
  {
    this.payload = this.decodeToken();

    console.log(this.payload)
  }

  Login(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Login",data)
  }

  Register(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Register",data)
  }

  getAllUsers(){
    return this.httpClient.get<User[]>("https://localhost:7134/api/Auth/GetAllUsers");
  }

  refreshToken(token:Token){
    return this.httpClient.post<Token>('https://localhost:7134/api/Auth/RefreshToken',token);
  }

  storeToken(accessToken:string,refreshToken:string){
    localStorage.setItem('AccessToken',accessToken)
    localStorage.setItem('RefreshToken',refreshToken)
  }

  getAccessToken(){
    return localStorage.getItem('AccessToken')
  }

  getRefreshToken(){
    return localStorage.getItem('RefreshToken')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('AccessToken');
  }

  signOut(){
    localStorage.removeItem('AccessToken')
    localStorage.removeItem('RefreshToken')
    this.router.navigate(["/login"])
  }


  decodeToken(){
    const jwtHalper = new JwtHelperService();
    const token = this.getAccessToken()!;
    console.log(jwtHalper.decodeToken(token))
    return jwtHalper.decodeToken(token);
  }

  getEmail(){
    if(this.payload)
      return this.payload.Email;
  }
}

