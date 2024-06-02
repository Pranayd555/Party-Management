import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/register/services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private loginService: LoginServiceService, public router: Router, private toastr: ToastrService) { }

  CanActivate(): boolean {
    let token: string | null = null;
    this.loginService.tokenObservable$.subscribe(
      data => {
        token = data;
      }
    )
    if(token) {
      return true;
    } else {
      this.toastr.show('Please login to access party management list')
      this.router.navigate(['/register/user-login'])
      return false;
    }
  }

  
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).CanActivate();
}
