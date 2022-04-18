import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  jwtToken = new BehaviorSubject(null);
  verifyUrl=new BehaviorSubject(null)
  NavbarIcon =new Subject();
  homeContentData:any
  headerChange=new Subject()
  VideoUrl=new Subject();
  course_id: any;
  course_name: any;
  fullname=new Subject()
  matdialogCategory: any;
  matdialogDuration: any;
  
  constructor(private http:HttpClient) { }

  fullnameSend(data:any){
    this.fullname.next(data)
  }
  getToken(token:any){
    this.jwtToken.next(token);
  }
  getUrl(url:any){
    console.log(url)
    this.verifyUrl.next(url)
  } 

  findNotificationSettingsProfile(NavbarIcon:any){
    this.NavbarIcon.next(NavbarIcon)
      }

//       triggerHeader(data:any){
// this.headerChange.next(data)
//       }
      viewCourse(){

        let viewCourseUrl=new URL("https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/viewCourse?courseName=course_name&courseId=62273c244603abcaf3ffeeb1")
        viewCourseUrl.searchParams.set('courseName', this.course_name);
        viewCourseUrl.searchParams.set('courseId', this.course_id);
    
        let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
       return  this.http.get(viewCourseUrl.href, { headers: headers })
        
          }
      setIdAndName(course_id:any, course_name:any){
        this.course_id=course_id;
        this.course_name=course_name;
      }
      matdialogApplyFilterData(data1:any,data2:any){
        console.log(data1)
        console.log(data2)
        this.matdialogCategory=data1;
        this.matdialogDuration=data2;

      }
}
