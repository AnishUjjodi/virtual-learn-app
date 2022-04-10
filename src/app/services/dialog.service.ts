import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatConfFilterComponent } from '../materials/mat-conf-filter/mat-conf-filter.component';
import { ProfileSideNavigationComponent } from '../materials/profile-side-navigation/profile-side-navigation.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  filterDialogCond=new Subject()
  profileData: any;
  NavbarIcon: any;
  constructor(private dialog: MatDialog ) { }

  openConfirmDialog(){
    console.log('hi')
   return this.dialog.open(MatConfFilterComponent,{
      width:'70%',
      maxWidth:'70%',
      height: '66%',
     
     
      panelClass:'confirm-dialog-container',
      disableClose:true,
      position:{top:"100px"}
    });

    
  }

  openDialog(){
   return this.dialog.open(ProfileSideNavigationComponent, 
      {
        width:'33%',
        maxWidth:'34%',
        height:'100%',
       
       
        panelClass:'custom-dialog-container',
        disableClose:true,
        position:{top:"0px",right:"0px"},
        data:{
    
      profileData:this.profileData,
      NavbarIcon:this.NavbarIcon
    }
    }
    )}

 



  
  
  filterDilogCondition(){
  
    this.filterDialogCond.next(false)
  }

 
}

