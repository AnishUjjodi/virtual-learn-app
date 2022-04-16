import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login.component';
import { SuccessPasswordChangedComponent } from './success-password-changed/success-password-changed.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  
  { path: 'login', component: LoginComponent},

 
  
  {
    path: 'login-success',
    component: LoginSuccessComponent // another child route component that the router renders
  },
  {
    path: 'password-changed-successfully',
    component: SuccessPasswordChangedComponent // another child route component that the router renders
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
