import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private apiService:APIService,
    private router:Router
    ){}

  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        Email :["", Validators.required],
        Password :["", Validators.required],
      }
    )
  }
  
  Login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.apiService.Login(this.loginForm.value)
      .subscribe({
        next:(res =>{
          window.localStorage.setItem('jwt',res.message)
          alert(res.message)
          this.router.navigate([''])
        }),
        error:(err =>{
          alert(err)
        })
      })
    }
    else{
      window.alert("boshqatadan,davay")
    }
  }
}
