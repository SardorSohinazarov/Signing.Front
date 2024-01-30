import { Component } from '@angular/core';
import { APIService } from '../../Services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private api:APIService) {}

  LogOut(){
    this.api.signOut();
  }
}
