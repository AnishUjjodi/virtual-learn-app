import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';

import { MycourseComponent } from './mycourse/mycourse.component';
import { CourseDetailsComponent } from './mycourse/course-details/course-details.component';
import { CourseOverviewComponent } from './mycourse/course-details/course-overview/course-overview.component';
import { CourseChaptersComponent } from './mycourse/course-details/course-chapters/course-chapters.component';





@NgModule({
  declarations: [
    HomeComponent,
    MycourseComponent,
    CourseDetailsComponent,
    CourseOverviewComponent,
   
    CourseChaptersComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
    HttpClientModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
