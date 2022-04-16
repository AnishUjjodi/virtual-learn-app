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
  constructor(private router:Router,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params)
      this.pathname = params.get('name');
      console.log(this.pathname)
  });
  this.pageNavigationName=this.router.url.substring(1)
  }

}
