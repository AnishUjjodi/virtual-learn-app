import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {

    myCouseData: any;
    homeContent: any = [];
    ongoingCourse: any = 'ongoing';
    headers = new HttpHeaders({ 'Authorization': "jwt " + localStorage.getItem('login jwtToken') })
    myCourseContent: any = {};
    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
  
      let myCourseUrl = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myCourse"
  
      this.http.get(myCourseUrl, { headers: this.headers }).subscribe({
        next: (res: any = {}) => {
          this.myCourseContent = res;
          console.log(this.myCourseContent)
          if (res.data.onGoingCourses == [] && res.data.completedCourse == []) {
            this.myCouseData = " NO DATA"
          }
          else {
            this.myCouseData = "DATA"
          }
        }, error: (error: any) => {
          console.log(error)
        }
      })
    }
    switch(data: any) {
      this.myCouseData = 'DATA';
      this.ongoingCourse = data;
      console.log(this.ongoingCourse)
    }
  
  }
  
  
