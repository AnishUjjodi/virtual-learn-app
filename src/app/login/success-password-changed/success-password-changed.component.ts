import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-password-changed',
  templateUrl: './success-password-changed.component.html',
  styleUrls: ['./success-password-changed.component.scss']
})
export class SuccessPasswordChangedComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
routeLogin(){
  console.log("hahahah")
  this.router.navigate(['/login'])
}
}
