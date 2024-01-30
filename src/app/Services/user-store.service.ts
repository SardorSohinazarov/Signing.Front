import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private email = new BehaviorSubject<string>("");

  constructor() { }

  public setEmail(email:string){
    this.email.next(email);
  }

  public getEmail(){
    return this.email.asObservable();
  }
}
