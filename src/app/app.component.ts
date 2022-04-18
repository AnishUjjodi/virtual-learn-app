import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtualLearningApp';

  routerPath:any='/login'

  constructor(private router: Router) { 
        // router.events.subscribe((url:any) => console.log(url));
        // to print only path eg:"/login"
  }
  ngOnInit(){
    
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationStart) {
        console.log('start => ',event.url);
        this.routerPath=event.url
      }
      if(event instanceof NavigationEnd) {
        console.log('end => ',event.url);
      }
    });
    
 
  }

 
}
