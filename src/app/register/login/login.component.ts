import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private loginService : LoginServiceService, private router: Router) {}
  
  loginForm = this.fb.group({
    username : ['', [Validators.required, Validators.minLength(3)]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  })

  getUsername = this.loginForm.get('username');
  getPassword = this.loginForm.get('password');

  loadSpinner = false;

  ngOnInit(): void {}

  onSubmit() {
    if(this.loginForm.valid){
    this.loadSpinner = true;
    console.log('form data', this.loginForm);
    const userForm: IUserLogin = this.loginForm?.value;
    this.loginService.loginUser(userForm).subscribe(
       {next:   data => {
            console.log('logged in user', data)
            this.loadSpinner = false;
            this.router.navigate(['parties-list']);  
          },
        error: error => {
          this.loadSpinner = false;
          console.log('error while logging in', error)
        }}
        )
   }else {
    this.loginForm.markAllAsTouched();
   }
}
  }

