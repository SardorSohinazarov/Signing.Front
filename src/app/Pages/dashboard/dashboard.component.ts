import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { User } from '../../Interfaces/user';
import { UserStoreService } from '../../Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  public email:string = "";
  users!:User[];
  constructor(private api:APIService, private userStore:UserStoreService) {}
  ngOnInit(): void {
    this.api.getAllUsers()
      .subscribe(res =>{
        this.users = res
      })

    this.userStore.getEmail()
    .subscribe(val=>{
      var e = this.api.getEmail();
      this.email = val || e;
    });
  }

  LogOut(){
    console.log(this.api.getAllUsers())
    this.api.signOut();
  }
}
