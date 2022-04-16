// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-course-details',
//   templateUrl: './course-details.component.html',
//   styleUrls: ['./course-details.component.scss']
// })
// export class CourseDetailsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  sub: any;
  id: any;
  name: any;
  couseContent:any='';
  videoUrl:any='';
  Isvideo:boolean=false;
  @ViewChild('iframe')
  el!: ElementRef;
   d = document.getElementById("iframe"); 
   // this.d!.style.display='none';
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router,private http:HttpClient, private service:CommonService,private elRef: ElementRef) {
      // this.d!.style.display='none';
      // this.el.nativeElement.display='none';
      
     }
     ngAfterViewInit() {
      this.el.nativeElement.style.display = 'none';
    }
  ngOnInit(): void {
    
    this.service.VideoUrl.subscribe((data:any)=>{
      let code=data.slice(17)
      // if(data!==undefined){
      //   this.videoUrl=data.slice(17)
      // }
      this.Isvideo=true;
      console.log(this.d)
      let link="https://www.youtube.com/embed/"+code
      this.el.nativeElement.setAttribute('src', link);
      this.el.nativeElement.style.display = 'block';
      // this.el.nativeElement.display='block';
      // this.el.nativeElement.hidden=false;
      // this.d!.setAttribute("src",link );
      // this.d!.style.display='block';
      // this.videoUrl="https://www.youtube.com/embed/"+data.slice(17)
      // const player = this.elRef.nativeElement.querySelector('iframe');
    
  // player.load();
    })
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
        console.log(params)
       this.id = params.get('id'); 
       this.name = params.get('name');
      //  console.log(this.id)
      this.service.setIdAndName(this.id , this.name);
        this.service.viewCourse().subscribe(data=>{
        //  console.log(data)
         this.couseContent =data;
         console.log(this.couseContent)
       })
     
     
    
   });
   
  }
}


