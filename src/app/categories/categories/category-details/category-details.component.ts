import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import data from 'src/assets/json/data.json'

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  pathname:any
  pageNavigationName: any;
  checkData:any=data
  combinedArray:any=[]
  constructor(private router:Router,private _Activatedroute:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params)
      this.pathname = params.get('name');
      console.log(this.pathname)


      let homeContentUrl =
      'https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/search';

    let headers = new HttpHeaders({
      Authorization: 'jwt ' + localStorage.getItem('login jwtToken'),
    });
    this.http
      .post(
        homeContentUrl,
        {
          courseName:"" ,
          category: this.pathname,
          totalChapters: '',
        },
        { headers: headers }
      )
      .subscribe({
        next: (res: any = {}) => {
          console.log(res,"categefjdbshdsjfgdsfjdszvkhf")
          this.combinedArray=res.data
          // this.combinedArray=res.data.concat(this.checkData);
          // console.log(this.combinedArray)
        },
        error: (error: any) => {
         
          console.log(error);
        },
      });





  });
  this.pageNavigationName=this.router.url.substring(1)
  }

}
