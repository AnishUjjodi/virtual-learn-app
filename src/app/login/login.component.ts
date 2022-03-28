import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractControl, FormBuilder, } from '@angular/forms'
import ConfirmedValidator from './confirmedValidator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import Validation from './utils/validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ViewChild("error") myNameElem: ElementRef;
  // @ViewChild("errorMessage") errorMessage: ElementRef;

  logOrReg: any = 'welcome';
  registerContinue: any = 'register';
  toPersonalDetails: any = 'continue';
  forgotpassword: any
  swapVariableData: any = 'login'
  submitted: boolean = false;
  code: any;
  phnNumberSubmit: boolean = false;
  httpHeaders: any
  phoneNumber: any = ""
  postResponse: any
  verificationCodeNumber: any = []
  token: any
  jwtToken: any
  otpDigit1: any;
  otpDigit2: any;
  otpDigit3: any;
  otpDigit4: any;
  otp: any;
  verified: boolean = true;
  phnNumberToChangePwd:any;
  isVerified:any;

  public myForm: FormGroup;
  public loginForm: FormGroup;
  contactForm: FormGroup = new FormGroup({
    mobileNumber: new FormControl(''),
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')

  });
  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.myForm = formBuilder.group({
      mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
    this.loginForm = formBuilder.group({
      loginusername: ['', [Validators.required]],
      loginpassword: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      mobileNumber: [''],
      fullname: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,}$/)]],
      confirmPassword: ['', Validators.required]
    }
      ,
      {
        validators: [ConfirmedValidator.match('password', 'confirmPassword')]
      }
    );

  }


  get f(): { [key: string]: AbstractControl } {

    return this.contactForm.controls;
  }
  get m() {
    return this.myForm.controls;
  }
  LoginOrReg(text: any) {
    console.log("verification code")
    this.logOrReg = text;
    
  }
  login1() {
    console.log(this.loginForm.value)
    let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/login/user"

    let headers = new HttpHeaders({ 'Authorization': 'jwt' })
    this.http.post(urll, {
      "userName": this.loginForm.get('loginusername')!.value,
      "password": this.loginForm.get('loginpassword')!.value
    }, { headers: headers }).subscribe({
      next: (res) => {
        console.log(res)
      }, error: (error) => {
        alert(error.error.meta.message)

      }
    })
  }
  personalDetail(text: any) {
    if (this.verified == true) {
      this.toPersonalDetails = text;
    }
    // this.toPersonalDetails = text;

  }
  // get email() {
  //   return this.contactForm.get('email');
  // }

  onSubmit() {
    // account creation by adding personal details
    console.log(typeof this.contactForm.get('fullname')!.value);
    let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/userRegistration"
    let headers = new HttpHeaders({ 'Authorization': "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5MTgzMTAyNjc1NjgiLCJpYXQiOjE2NDgyODc5NDh9.lSOdBsHIsmG2TIsFj8F_-djdrXvB4XAvyQYOg3fyUQU" })
    this.http.post(urll, {
      "fullName": this.contactForm.get('fullname')!.value,
      "userName": this.contactForm.get('username')!.value,
      "email": this.contactForm.get('email')!.value,
      "password": this.contactForm.get('password')!.value,
      "confirmPassword": this.contactForm.get('confirmPassword')!.value
    }, { headers: headers }).subscribe({
      next: (res) => {

        console.log(res)
        let c: any = JSON.stringify(res)
        if (c.meta.message === "Account created") { //code 201
          console.log("success")
        }


      }, error: (error) => {

        console.log(error)
      }
    })

    this.submitted = true;
    console.log(this.contactForm.value);

  }
  onSubmitPhoneNUmber() {
    this.phnNumberSubmit = true;
    console.log(this.myForm.value);
  }
  //changing the forgot password!
vefifychangepasswordotp(){
  console.log("vvvvvvvvvvvvvvvv")
  this.registerContinue = 'continue';
}
  toChangePassword(text: any) {
    this.swapVariableData = text;
  }
changePwd(e:any, phnNumberToChangePwd:any){
 
  if(phnNumberToChangePwd.length==10){
    
    let url = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/forgot_password/sendOtp"
    this.http.post<any>(url, { phoneNumber: this.phnNumberToChangePwd }, { observe: 'response' }).subscribe({
      next: (res) => {
       
        if(res.body.meta.message=='OTP sent'){
          // this.registerContinue = 'continue';
          console.log(res)
          this.isVerified="verified";
        
        }
        console.log(res)

      }, error: (error) => {
console.log(error)
alert(error.error.meta.message)
        // if (error.error.meta) {
        //   console.log(error.error.meta.message)
        //   alert(error.error.meta.message)
        // }
        // console.log(this.myNameElem.nativeElement)
        // this.myNameElem.nativeElement.innerHTML = error.error.message;

      }
    })

  }
  }
  RegContinue(text: any): any {




    let url = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/sendOtp"
    this.http.post<any>(url, { phoneNumber: this.phoneNumber }, { observe: 'response' }).subscribe({
      next: (res) => {
        console.log(res.body.meta.token)
        this.token = res.body.meta.token
        console.log("jwt " + this.token)
        this.jwtToken = "jwt " + this.token
        this.phnNumberSubmit = true;
        this.registerContinue = text;
        this.swapVariableData = text;

      }, error: (error) => {

        if (error.error.meta) {
          console.log(error.error.meta.message)
          alert(error.error.meta.message)
        }
        // console.log(this.myNameElem.nativeElement)
        // this.myNameElem.nativeElement.innerHTML = error.error.message;

      }
    })

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
    this.verificationCodeNumber.push(c.value)
    console.log(this.verificationCodeNumber)
    console.log(parseInt(this.verificationCodeNumber.join("")))
    if (this.otp.toString().length === 4) {
      console.log(this.otp.toString().length)
      let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/verfiyOtp"

      let headers = new HttpHeaders({ 'Authorization': this.jwtToken })
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
            // this.errorMessage.nativeElement.class = "alert alert-danger"

          }
        }
      })

    }
  }
  verify(){
    this.swapVariableData='verifyy';
  }
  fromParent(data:any){
this.toPersonalDetails=data;
this.swapVariableData=data;
console.log(data)
  }
  
}




