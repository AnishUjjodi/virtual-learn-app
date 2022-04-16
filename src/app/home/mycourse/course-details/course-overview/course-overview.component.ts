// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-course-overview',
//   templateUrl: './course-overview.component.html',
//   styleUrls: ['./course-overview.component.scss']
// })
// export class CourseOverviewComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {
  couseContent:any;
  showMore:boolean;
  headers:any=''
  constructor(private service:CommonService ,private http:HttpClient) {
    this.showMore=false;
   }

  ngOnInit(): void {
    this.headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
   this.service.viewCourse().subscribe(data=>{
      this.couseContent=data
    

    })
   
  }

  joinCourse(courseName:any,courseId:any){
  
    this.http.get("https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/user/joinCourse?courseName="+courseName+"&courseId="+courseId+"", { headers: this.headers }).subscribe({
  




    
        // let viewCourseUrl=new URL("https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/user/joinCourse?courseName=courseName&courseId=62273c244603abcaf3ffeeb1")
        // viewCourseUrl.searchParams.set('courseName', course_name);
        // viewCourseUrl.searchParams.set('courseId', course_id);
      
        // this.http.get(viewCourseUrl.href, { headers: headers }).subscribe({
          next: (res:any={}) => {
            console.log(res)
           
           
          
          
          }, error: (error:any) => {
            console.log("error")
            console.log(error)
          }
        })
        
          }

}


