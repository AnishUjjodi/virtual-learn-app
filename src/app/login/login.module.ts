import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './verify/verify.component';
import { CoreModule } from '../core/core.module';
import { SuccessPasswordChangedComponent } from './success-password-changed/success-password-changed.component';
import { LoginSuccessComponent } from './login-success/login-success.component';



@NgModule({
  declarations: [
    LoginComponent,
    VerifyComponent,
    SuccessPasswordChangedComponent,
    LoginSuccessComponent
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule
    
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
