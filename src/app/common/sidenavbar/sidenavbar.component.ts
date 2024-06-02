import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {
  isOpen = true;

  @ViewChild('sideNav') sideNave!: ElementRef

  showNav() {
    this.isOpen = true;
  }
  hideNav() {
    this.isOpen = false;
  }

  constructor(private element: ElementRef) {}
}
