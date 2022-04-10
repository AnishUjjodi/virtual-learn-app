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

  constructor() { }
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
}
