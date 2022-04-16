import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../services/common.service';
import { DialogService } from '../services/dialog.service';
import data from 'src/assets/json/data.json'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  checkData:any=data
  allCourses: any = []
  categorie: any = ""
  filterDialogBox: boolean = false
  homeContent: any = ""
  headers = new HttpHeaders({ 'Authorization': "jwt " + localStorage.getItem('login jwtToken') })
  profileData: any = [];
  successLoginTemplateTime=0
  routeButton: any='all';
 
  constructor(private service: CommonService, private http: HttpClient, private dialogService: DialogService,private router:Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.successLoginTemplateTime=10
      this.service.triggerHeader('/home')
    
    }, 10000);
    
    localStorage.setItem('login jwtToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDJhNjAzOWYyMWEwNTRmYWY1NjFiNyIsImlhdCI6MTY0ODY1Mzg5MX0.-9uP4FO7TiO0En35r8DlYVh3IDhtNTigSDZlFfk7nE8")
    let profileDataUrl = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myProfile"

    this.http.get(profileDataUrl, { headers: this.headers }).subscribe({
      next: (res: any = {}) => {
        this.profileData = res
        this.dialogService.profileData = res
      }, error: (error: any) => {
        console.log(error)
      }
    })


    let homeContentUrl = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/home/user"

    let headers = new HttpHeaders({ 'Authorization': "jwt " + localStorage.getItem('login jwtToken') })
    this.http.get(homeContentUrl, { headers: headers }).subscribe({
      next: (res: any = {}) => {
        console.log(res)
        this.homeContent = res.data;
        this.service.homeContentData=res.data;
        this.allCourses = res.data.allCourses
        console.log(this.allCourses)
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }

  routeButtonClick(data:any){
    this.routeButton=data
    console.log(this.routeButton)

  }
  
  categories(data: any) {
    this.categorie = data
    console.log(this.categorie)
  }

  filterDialog() {


    this.filterDialogBox = true

    this.dialogService.openConfirmDialog()

    this.dialogService.filterDialogCond.subscribe((data: any) => {
      this.filterDialogBox = data
      console.log(this.filterDialogBox)

    })
  }

  closeDialog() {
    this.dialogService.openConfirmDialog()
  }
  getbackCss(data:any){
    return this.routeButton===data?'#DFE7F4':'white';
  }

}