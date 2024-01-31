import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../../Services/api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(
    private formBuilder:FormBuilder,
    private apiService:APIService,
    private router:Router
    ){}

    registerForm!:FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        Name :["", Validators.required],
        Email :["", Validators.required],
        PhoneNumber :["", Validators.required],
        Password :["", Validators.required],
      }
    )
  }
  
  Register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.apiService.Register(this.registerForm.value)
      .subscribe({
        next:(res =>{
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
