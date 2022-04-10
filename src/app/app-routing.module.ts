import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './categories/categories/category-details/category-details.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

const routes: Routes = 
[ 
  { path: '',
pathMatch: 'full', 
redirectTo:'login'
// loadChildren:()=>import('./home/home.module').then(mod=>mod.HomeModule)
},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)},
  { path: 'category-detail/:name', component: CategoryDetailsComponent} 
 
];

@NgModule({
  imports: [
    HomeRoutingModule,
    LoginRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
