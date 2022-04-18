import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-mat-conf-filter',
  templateUrl: './mat-conf-filter.component.html',
  styleUrls: ['./mat-conf-filter.component.scss']
  
})
export class MatConfFilterComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MatConfFilterComponent>,private dialog:DialogService,private ngZone: NgZone,private commonService:CommonService) { }

  toggle:Boolean=false
  categories:any=""
  durations:any
  buttonNumber:any=0
  durationButton:any=0

  ngOnInit(): void {
  }

  closeDialog(){
console.log("no")
this.ngZone.run(() => {
  this.dialogRef.close(false);
});
 

  

    this.dialog.filterDilogCondition()

  }

  categorie(categorie: any,duration: any,number:any){
    if(number<12){
      this.buttonNumber=number
    }else{
      this.durationButton=number
    }
   
    console.log(this.buttonNumber)
this.categories=categorie
this.durations=duration
    this.toggle=!this.toggle
    console.log(this.categories,this.durations)
    

  }

  clearFilter(){
    this.buttonNumber=0;
    this.durationButton=0
    this.categories=''
this.durations=''
console.log(this.categories,this.durations)
  }
  applyFilter(){
    this.commonService.matdialogApplyFilterData(this.categories,this.durations)
  }

 

}
