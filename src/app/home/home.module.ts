import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { LoginSuccessComponent } from './login-success/login-success.component';





@NgModule({
  declarations: [
    HomeComponent,
    LoginSuccessComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   CoreModule,
    HttpClientModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
