import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login/login.component';
import { UtilityModule } from '../shared/modules/utilities.module';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    UtilityModule
  ]
})
export class RegisterModule { }
