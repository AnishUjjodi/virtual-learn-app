import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  @Output() verification=new EventEmitter<any>()
  constructor(private http:HttpClient) { }
  otpDigit1:any;
  otpDigit2:any;
  otpDigit3:any;
  otpDigit4:any;
  otp:any;
  token:any;
  verified:any;

  ngOnInit(): void {
  }
  triggerParent(){
   this.verification.emit("verify")
  }
  move(e: any, p: any, c: any, n: any) {
    this.otp = this.otpDigit1 + this.otpDigit2 + this.otpDigit3 + this.otpDigit4;
    console.log(this.otpDigit1 + this.otpDigit2 + this.otpDigit3 + this.otpDigit4)
    const nodeList = document.querySelectorAll<HTMLElement>(".input-field");
    let len = c.value.length;
    let maxlength = c.getAttribute('maxlength')
    if (len == maxlength) {
      if (n != '') {
        n.focus();

      }
      else {
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.borderBottom = '1px solid  #00E217 ';

        }

      }
      // 
    }
    if (e.key == 'Backspace') {
      // this.verificationCodeNumber.pop()
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.borderBottom = '1px solid rgba(255, 255, 255, 0.4)';
      }
      if (p !== '') {
        p.focus();
      }

    }
   
  
    if (this.otp.toString().length === 4) {
      console.log(this.otp.toString().length)
      let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/verfiyOtp"

      let headers = new HttpHeaders({ 'Authorization': "this.jwtToken "})

      this.http.post(urll, { otp: this.otp }, { headers: headers }).subscribe({
        next: (res) => {
          console.log("vv")
          console.log(res)
          let b: any = JSON.stringify(res)
          console.log(b)
          if (b.meta.code == 200) {
            this.verified == true
            this.token = b.meta.token
          }



        }, error: (error) => {

          if (error.error.meta.code == 404) {
            for (let i = 0; i < nodeList.length; i++) {
              nodeList[i].style.borderBottom = '1px solid  red';

            }
            // console.log(this.errorMessage.nativeElement)
            // this.errorMessage.nativeElement.innerHTML = error.error.meta.message;
           
          }
        }
      })

    }


  }
  // move(e: any, p: any, c: any, n: any) {

  // }
}