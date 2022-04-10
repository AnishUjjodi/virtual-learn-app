import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';




@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  @Output() verification = new EventEmitter<any>()
  subscription: any;
  constructor(private http: HttpClient, private service: CommonService) { }
  otpDigit1: any;
  otpDigit2: any;
  otpDigit3: any;
  otpDigit4: any;
  otp: any;
  token: any;
  verified: boolean=false;
  jwtToken: any;
  verifyUrl: any;
  wrongOtp:boolean=false;
  errorMessage:any;
  otpVerificationStatus:any
  errorresponseMessage:any
  nodeList:any


  ngOnInit(): void {

    this.subscription = this.service.jwtToken.subscribe((value) => {
      this.jwtToken = value;
      console.log(this.jwtToken)
    })
    this.service.verifyUrl.subscribe((value) => {
      this.verifyUrl = value;
      console.log(this.verifyUrl)
    })
 console.log("ngOninit")
  }

  triggerParent() {
    
    setTimeout(() => {
      console.log(this.verified)
      // if (this.verified === true) {
      //   this.verification.emit("verify")
      //   console.log("triggering parent now")
      // }
     
     }, 1000);
     console.log(this.otp.toString().length)
    
     let url = this.verifyUrl
     console.log(this.jwtToken)
     console.log(this.verifyUrl)
     let headers = new HttpHeaders({ 'Authorization': this.jwtToken })

     this.http.post(url, { otp: this.otp }, { headers: headers }).subscribe({
       next: (res:any={}) => {
     
         console.log(res)
      
         let b: any = JSON.stringify(res)
         console.log(b)
         console.log(typeof b)
         if (res.meta.code == 200) {
           this.verified = true
           this.token = "jwt " + res.meta.token
           // this.service.getToken(this.token)
           this.service.getToken(this.jwtToken)
           console.log(res.meta)
           this.otpVerificationStatus=true
           this.verification.emit(this.otpVerificationStatus)
         }
      
      }, error: (error) => {

        this.otpVerificationStatus=false 
        this.verification.emit(this.otpVerificationStatus)
        console.log(error)
        this.errorresponseMessage=error.error.meta.message
        for (let i = 0; i < this.nodeList.length; i++) {
          this.nodeList[i].style.borderBottom = '1px solid red';


        }

        

    }
      })
     
    }
       


    

    

  
  move(e: any, p: any, c: any, n: any) {
    this.otp = this.otpDigit1 + this.otpDigit2 + this.otpDigit3 + this.otpDigit4;

    console.log(this.otpDigit1 + this.otpDigit2 + this.otpDigit3 + this.otpDigit4)
    this.nodeList = document.querySelectorAll<HTMLElement>(".input-field");
    let len = c.value.length;
    let maxlength = c.getAttribute('maxlength')
    if (len == maxlength) {
      if (n != '') {
        n.focus();

      }
      else {
        this.wrongOtp=false;
        for (let i = 0; i < this.nodeList.length; i++) {
          this.nodeList[i].style.borderBottom = '1px solid  #00E217 ';


        }
      
      }
      // 
    }
    if (e.key == 'Backspace') {
      // this.verificationCodeNumber.pop()
      this.wrongOtp=false;
      for (let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].style.borderBottom = '1px solid rgba(255, 255, 255, 0.4)';
        

      }
      if (p !== '') {
        p.focus();
      }

    }
    // if (this.otp.toString().length === 4) {
    //   console.log(this.otp.toString().length)
    
    //   let url = this.verifyUrl
    //   console.log(this.jwtToken)
    //   console.log(this.verifyUrl)
    //   let headers = new HttpHeaders({ 'Authorization': this.jwtToken })

    //   this.http.post(url, { otp: this.otp }, { headers: headers }).subscribe({
    //     next: (res:any={}) => {
      
    //       console.log(res)
       
    //       let b: any = JSON.stringify(res)
    //       console.log(b)
    //       console.log(typeof b)
    //       if (res.meta.code == 200) {
    //         this.verified = true
    //         this.token = "jwt " + res.meta.token
    //         // this.service.getToken(this.token)
    //         this.service.getToken(this.jwtToken)
    //         console.log(res.meta)

    //       }
        


    //     }, error: (error) => {
    //       console.log(error)
    //       if (error.error.meta.code == 404) {
    //         this.wrongOtp=true;
    //        this.errorMessage=error.error.meta.message;
    //         for (let i = 0; i < nodeList.length; i++) {
    //           nodeList[i].style.borderBottom = '1px solid  red';

    //         }
          

    //       }
       

      //   }
      // })

    // }


  }
 
}
