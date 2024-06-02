import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/register/services/login-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  isOpen = false;

  @ViewChild('sideNav') sideNave!: ElementRef

  constructor(private router:Router, 
    private loginService: LoginServiceService
  ) {}

  token: string | null = null;
  ngOnInit(): void {
    this.loginService.tokenObservable$.subscribe(
      data => {
        this.token = data;
      }
    )
  }
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  logOutUser() {
    this.loginService.logoutUser().subscribe();
  }

  
  showNav() {
    this.isOpen = true;
  }
  hideNav() {
    this.isOpen = false;
  }
}
