import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtualLearningApp';

  routerPath:any

  constructor(private router: Router) { 
        // router.events.subscribe((url:any) => console.log(url));
        // to print only path eg:"/login"
  }
  ngOnInit(){
    setTimeout(() => {
      console.log(this.router.url)
      this.routerPath=this.router.url
    }, 100);
    
 
  }

 
}
