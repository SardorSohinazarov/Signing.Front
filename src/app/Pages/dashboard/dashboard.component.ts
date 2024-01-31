import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { User } from '../../Interfaces/user';

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
  constructor(private api:APIService) {}
  ngOnInit(): void {
    this.api.getAllUsers()
      .subscribe(res =>{
        this.users = res
      })

    this.email = this.api.getEmail();
  }

  LogOut(){
    console.log(this.api.getAllUsers())
    this.api.signOut();
  }
}
