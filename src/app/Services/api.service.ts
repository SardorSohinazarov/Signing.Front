import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private httpClient: HttpClient,private router:Router) { }

  jwt = window.localStorage.getItem('jwt')

  Login(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Login",data)
  }

  Register(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Register",data)
  }

  storeToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('token');
  }

  signOut(){
    localStorage.removeItem('token')
    this.router.navigate(["/login"])
  }

  getAllUsers(){
    var hearder = new HttpHeaders({"Authorization":"Bearer "+this.getToken()})
    return this.httpClient.get<User[]>("https://localhost:7134/api/Auth/GetAllUsers");
  }
}

