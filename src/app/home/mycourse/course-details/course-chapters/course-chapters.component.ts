// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-course-chapters',
//   templateUrl: './course-chapters.component.html',
//   styleUrls: ['./course-chapters.component.scss']
// })
// export class CourseChaptersComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-course-chapters',
  templateUrl: './course-chapters.component.html',
  styleUrls: ['./course-chapters.component.scss']
})
export class CourseChaptersComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<String>();
  couseContent: any;
showChapterContent:boolean=false;
ChapterContent:any;
num:any
  constructor(private service:CommonService) { }

  ngOnInit(): void {
    
    this.couseContent = this.service.viewCourse().subscribe(data=>{
      console.log("bbbbbbbbbbbbbbbbbb")
      this.couseContent=data
console.log(this.couseContent.data.totalChapters)
      for(let i=0;i<this.couseContent.data.totalChapters;i++){
        this.couseContent.data.chapters[i].show=false
        console.log("vvvvvvvvvvvvvvvvv")
      }
      console.log(this.couseContent)
    })
   
  }
  toggleButton(chapterNo:any, button:any){
   
  
    // this.ChapterContent=this.couseContent.data.chapters[chapterNo]
    // console.log(this.showChapterContent)
    for(let i=0;i<this.couseContent.data.totalChapters;i++){
      if(i==chapterNo){
        this.couseContent.data.chapters[chapterNo].show=!this.couseContent.data.chapters[chapterNo].show
      }
      else{
        this.couseContent.data.chapters[i].show=false
      }
      
    
    }
    this.num=chapterNo
    console.log(chapterNo)
    console.log(this.couseContent.data.chapters[chapterNo].show)
    // this.couseContent.data.chapters[chapterNo].show=!this.couseContent.data.chapters[chapterNo].show
    console.log(this.couseContent.data.chapters[chapterNo].show)
    this.ChapterContent=this.couseContent.data.chapters[chapterNo]
    // this.showChapterContent=!this.showChapterContent
  }
  playVideo(videoLink:any){
    // console.log(videoLink)
    // this.dataEvent.emit(videoLink);
    this.service.VideoUrl.next(videoLink)
  }
}


