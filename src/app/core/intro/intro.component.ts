import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  windowWidth: any;
  splashTransition: any;
  opacityChange: number = 1;
  showSplash = true;

   animationDuration: number = 0.5;
 duration: number = 3;
 constructor(private dialogService:DialogService){}

  ngOnInit(): void {
    setTimeout(() => {
      let transitionStyle = "";
     
      transitionStyle = "opacity " + this.animationDuration + "s";
      this.opacityChange = 0;
      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  
  }
  // filterDialog(){
 
    
  //     this.dialogService.openConfirmDialog()
  // }


}
