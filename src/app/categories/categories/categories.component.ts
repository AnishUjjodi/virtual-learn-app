import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  pageNavigationName:any;
  homeContentData:any

  constructor(private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {

    this.pageNavigationName=this.router.url.substring(1)
    this.homeContentData=this.commonService.homeContentData
  }

}
