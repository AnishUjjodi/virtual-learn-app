import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchContent:any
  searchContentStatus:any=0
  searchButtonStatus:boolean=false
  
  dropdownToggle:boolean=false
  categorie:any=""
searchInfo:any=""
toggle:boolean=false

filterDialogBox:boolean=false
homeContent:any=""
headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})

  constructor(private http:HttpClient,private dialogService:DialogService,private service:CommonService) {}

  ngOnInit(): void {
 
  }

  onSearchEnter() {
    // if(this.toggle&&this.searchContentStatus===400){
    //   this.toggle=true
    // }
    
    // if(this.toggle&&this.searchInfo!==''){
    //   this.searchButtonStatus=true
    //   this.toggle = true;
    // }else{
    //   this.searchButtonStatus=false
    // }

    this.searchButtonStatus=true
    
    let homeContentUrl =
      'https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/search';

    let headers = new HttpHeaders({
      Authorization: 'jwt ' + localStorage.getItem('login jwtToken'),
    });
    this.http
      .post(
        homeContentUrl,
        {
          courseName: this.searchInfo,
          category: this.categorie,
          totalChapters: '',
        },
        { headers: headers }
      )
      .subscribe({
        next: (res: any = {}) => {
          this.searchContent = res;
          this.searchContentStatus = res.meta.code;
          console.log(res, 'search result');
          console.log(this.searchContentStatus); //changes it later
        },
        error: (error: any) => {
          this.searchContent = error;
          this.searchContentStatus = error.status;
          console.log(error);
        },
      });
  }

  filterToggle() {
    // if(this.searchInfo!==''){
    //   this.searchButtonStatus=true
    // }else{
    //   this.searchButtonStatus=false
    // }
    
    this.toggle = true;
    if(this.searchContentStatus===200){
      this.toggle = true;
    }

    // console.log(this.toggle);
    // if (this.filterDialogBox === true) {
    //   this.toggle = false;
    // }
  }

  filterunToggle(){
    if(this.searchInfo===''){
      this.toggle = false;
      this.searchButtonStatus=false
    }
    if(this.searchInfo!==''&&this.searchContentStatus===400){
      this.toggle=true
    }
    if(this.searchInfo===''&&this.searchContentStatus===400){
      this.searchContentStatus=0
    }

    
    // if(this.searchInfo!==''&&this.searchButtonStatus===true){
    //   this.toggle=true;

    // }else{
    //   this.toggle=false
    // }
  }

  removeAllToggle(){
    this.toggle = false;
    this.searchButtonStatus=false
    this.searchContentStatus=0
    this.searchInfo=''

  }
  filterDialog(){
 
    if(this.toggle===true){
      this.toggle=false
    }
    this.filterDialogBox=true 
    // this.ngZone.run(() => {
      this.dialogService.openConfirmDialog()
    // });

    
   
    
    this.dialogService.filterDialogCond.subscribe((data:any)=>{
      this.filterDialogBox=data
      console.log(this.filterDialogBox)
   
    })
  }

  dropdownToggled(){
    this.dropdownToggle=!this.dropdownToggle
  }

  openDialog(NavbarIcon:any){
    this.dropdownToggle=false
    this.service.findNotificationSettingsProfile(NavbarIcon)
      console.log("opening")
      this.dialogService.NavbarIcon=NavbarIcon

      this.dialogService.openDialog()
      

     

}
categories(data:any){
  this.categorie=data
  console.log(this.categorie)
}
}

