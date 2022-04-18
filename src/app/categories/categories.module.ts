import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';



const routes: Routes = [{ path: '', component: CategoriesComponent }];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
