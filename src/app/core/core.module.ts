import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
   
    
    IntroComponent,
             HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  exports:[
    
  HeaderComponent,
    IntroComponent
  ]
})
export class CoreModule { }
