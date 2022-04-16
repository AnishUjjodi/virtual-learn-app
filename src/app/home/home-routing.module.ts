
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { CourseChaptersComponent } from './mycourse/course-details/course-chapters/course-chapters.component';
import { CourseDetailsComponent } from './mycourse/course-details/course-details.component';
import { CourseOverviewComponent } from './mycourse/course-details/course-overview/course-overview.component';
import { MycourseComponent } from './mycourse/mycourse.component';
// import { CourseChaptersComponent } from './mycourse/course-details/course-chapters/course-chapters.component';
// import { CourseDetailsComponent } from './mycourse/course-details/course-details.component';
// import { CourseOverviewComponent } from './mycourse/course-details/course-overview/course-overview.component';


const routes: Routes = [{ path: 'home', component: HomeComponent },
{path: 'myCourse', component: MycourseComponent},
{path: 'courseDetails/:id/:name', component: CourseDetailsComponent,
children: [
  {
    path:'',
    redirectTo: 'course-overview',
    pathMatch: 'full' 
  },
  
  {
    path: 'course-overview',
    component: CourseOverviewComponent // another child route component that the router renders
  },
  {
    path: 'course-chapters', // child route path
    component: CourseChaptersComponent // child route component that the router renders
  }

],}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
