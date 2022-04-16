import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtualLearningApp';

  routerPath:any='/login'

  constructor(private router: Router,private service:CommonService) { 
        // router.events.subscribe((url:any) => console.log(url));
        // to print only path eg:"/login"
  }
  ngOnInit(){
    
    this.service.headerChange.subscribe((data:any)=>{
      setTimeout(() => {
        console.log(this.router.url)
        this.routerPath=this.router.url
      }, 100);
    })
    
 
  }

 
}
