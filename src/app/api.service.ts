import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpClient: HttpClient) { }

  Login(data:any){
    return this.httpClient.post<any>("https://localhost:7134/api/Auth/Login",data)
  }

  Register(data:any){
    return this.httpClient.post<any>("",data)
  }
}