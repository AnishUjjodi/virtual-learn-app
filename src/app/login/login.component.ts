import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractControl, FormBuilder, } from '@angular/forms'
import ConfirmedValidator from './confirmedValidator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
// import Validation from './utils/validation';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("error")
  myNameElem!: ElementRef;
  @ViewChild("errorMessage") errorMessage!: ElementRef;

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
  phnNumberToChangePwd: any;
  isVerified: any;
  gotoLogin: boolean = true;
  phnNum: any;
  re = /(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,12}).*$/
  loginUserNameValidation:any;
  loginUserPasswordValidation: any;
 errorMessageFromServer:any
  
  changepsswordToken: any;
  errorMessageHandler:any='fullname'

  registerPageError: any;
  passwordChangedTemplate:boolean=false

  public myForm: FormGroup=new FormGroup({
    mob:new FormControl('')
  })
  public loginForm: FormGroup;
  public changepasswordForm!: FormGroup;
  contactForm: FormGroup = new FormGroup({
    
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')


  });
  regError: any;
  loginToken: any;
  

 
  constructor(public formBuilder: FormBuilder, private http: HttpClient, private service: CommonService,private router:Router) {
    // this.myForm = formBuilder.group({
    //   mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    // })
    this.changepasswordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/)]],
      confirmPassword: ['', Validators.required]
    }
      ,
      {
        validators: [ConfirmedValidator.match('password', 'confirmPassword')]
      })

    this.loginForm = formBuilder.group({
      loginusername: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      loginpassword: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z][a-z])(?=[^A-Z][A-Z]).{6,}$/)], Validators.minLength(5)]
    })
  }

  ngOnInit(): void {
    // this.service.triggerHeader('/login')
  
   
    
    this.service.jwtToken.subscribe((value) => {
      this.changepsswordToken = value;
      console.log(this.changepsswordToken)
    })
    this.contactForm = this.formBuilder.group({
     
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/)]],
      confirmPassword: ['', Validators.required]
    },
      // ,/^(?=\D*\d)(?=[^a-z][a-z])(?=[^A-Z][A-Z]).{6,}$/
      {
        validators: [ConfirmedValidator.match('password', 'confirmPassword')]
      }
    );

  }


  LoginOrReg(text: any) {
    console.log("verification code")
    this.logOrReg = text;

  }
  onFocus1(e:any){
    console.log(e)
    e.preventDefault()
    console.log("focused")
    // this.registerPageError=!this.registerPageError
    this.phnNumberSubmit=false;
  }
  onFocus(e:any,d:any){
    console.log(e)
    console.log(d)
   
    this.errorMessageHandler=e
  }

  //   button onclick function for registration page
  RegContinue(text: any): any {
    // this.phnNumberSubmit = true;
    //     this.registerContinue = text;
    //     this.swapVariableData = text;
    this.phnNumberSubmit = true;
    let url = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/sendOtp"
    this.http.post<any>(url, { phoneNumber:this.myForm.value.mob.slice(4)}, { observe: 'response' }).subscribe({
      next: (res) => {
        console.log(res.body.meta.token)
        this.token = res.body.meta.token
        console.log("jwt " + this.token)
        this.jwtToken = "jwt " + this.token
        this.service.getToken(this.jwtToken)
        this.service.getUrl("https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/verfiyOtp")
        this.registerContinue = text;
        this.swapVariableData = text;

      }, error: (error) => {

        
          console.log(error)
          this.regError=error.error.meta
          

      }
    })

  }
  get f(): { [key: string]: AbstractControl } {

    return this.contactForm.controls;
  }
  get m() {

    console.log(this.myForm.controls)
    return this.myForm.controls;

  }

  login1() {
    console.log(this.loginForm.value)
    let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/login/user"
console.log(this.re.test(this.loginForm.get('loginusername')!.value))
this.loginUserNameValidation=this.re.test(this.loginForm.get('loginusername')!.value)
this.loginUserPasswordValidation=this.re.test(this.loginForm.get('loginpassword')!.value)
    let headers = new HttpHeaders({ 'Authorization': 'jwt' })
    this.http.post(urll, {
      "userName": this.loginForm.get('loginusername')!.value,
      "password": this.loginForm.get('loginpassword')!.value
    }, { headers: headers }).subscribe({
      next: (res:any) => {
        console.log(res)
        this.loginToken=res.meta.token
        localStorage.setItem('login jwtToken',this.loginToken )
        this.router.navigate(['/login-success']);
      }, error: (error) => {
        console.log(error)

        this.errorMessageFromServer=error.error.meta.message
        if(error.error.meta.code===404){
          this.loginUserPasswordValidation=false
          this.loginUserNameValidation=false
        }
        
        // alert(error.error.meta.message)

      }
    })
  }
  personalDetail(text: any) {
    if (this.verified == true) {
      this.toPersonalDetails = text;
    }
  

  }

  // creating new acc by adding personal details
  onSubmit() {

    console.log(typeof this.contactForm.get('fullname')!.value);
    let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/userRegistration"
    this.service.jwtToken.subscribe((value) => {
      this.jwtToken = value;
      console.log(this.jwtToken)
    })
    let headers = new HttpHeaders({ 'Authorization': this.jwtToken })
    this.http.post(urll, {
      "fullName": this.contactForm.get('fullname')!.value,
      "userName": this.contactForm.get('username')!.value,
      "email": this.contactForm.get('email')!.value,
      "password": this.contactForm.get('password')!.value,
      "confirmPassword": this.contactForm.get('confirmPassword')!.value
    }, { headers: headers }).subscribe({
      next: (res:any) => {

        console.log(res)
        // let c: any = JSON.stringify(res)
        // if (c.meta.message === "Account created") { 
        //   console.log("success")
        // }
        // this.router.navigate(['/login-success'])//if we r doing auto login after register please use this
        localStorage.setItem('reg jwtToken',res.meta.token )
this.router.navigate(['/login'])

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
  vefifychangepasswordotp() {
    console.log("vvvvvvvvvvvvvvvv")
    this.registerContinue = 'continue';
  }
  toChangePassword(text: any) {
    this.swapVariableData = text;
  }
  changePwd(e: any, phnNumberToChangePwd: any) {
    
    
        

    if (phnNumberToChangePwd.length == 10) {

      let url = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/forgot_password/sendOtp"
      this.http.post<any>(url, { phoneNumber: this.phnNumberToChangePwd }, { observe: 'response' }).subscribe({
        next: (res) => {

          if (res.body.meta.message == 'OTP sent') {
            
            this.swapVariableData = 'verifyy';
            this.isVerified = "verified";
            console.log(res)
            this.service.getToken("jwt " + res.body.meta.token)
            this.service.getUrl("https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/forgot_password/verifyOtp")


          }


        }, error: (error) => {
          console.log(error)
          alert(error.error.meta.message)
         

        }
      })

    }
  

  


  }
  fromParent(data: any) {
    console.log(data)
    if(data===true){
      this.toPersonalDetails = 'verify';
      this.swapVariableData = 'verify';
    }
    
    console.log(this.toPersonalDetails)
    console.log(this.swapVariableData)
    console.log(data)
  }
  // move1(e: any, phnNum: any) {
  //   console.log(phnNum)
  //   if (e.keyCode === 13 && phnNum.length == 10) {
  //     e.preventDefault(); 
  //     this.gotoLogin = false;

  //   }
    
    
  // }
  move1(e: any) {
    this.gotoLogin = false;
    console.log(this.phnNum.toString())
    // console.log(this.phnNum.length)
    let phnno=this.phnNum.toString()
    if(phnno.length==10){
      this.gotoLogin = false;
    }
    this.myForm = this.formBuilder.group({
      // mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      mob: ['+91 '+this.phnNum, [Validators.required, Validators.pattern("^[+][9][1][ ][6-9]{1}[0-9]{9}$")]]
    })
  }
  onChangePassword() {
    console.log("gii")
    console.log(this.changepasswordForm.controls)
    console.log(this.changepasswordForm.value)
    let urll = "https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/forgot_password/resetPassword"


    console.log(this.changepsswordToken)

    let headers = new HttpHeaders({ 'Authorization': this.changepsswordToken })
    console.log(this.changepasswordForm.get('password')!.value)
    console.log(this.changepasswordForm.get('confirmPassword')!.value)
    this.http.post(urll, {
      "password": this.changepasswordForm.get('password')!.value,
      "confirmPassword": this.changepasswordForm.get('confirmPassword')!.value

    }, { headers: headers }).subscribe({
      next: (res) => {
        console.log(res)
        this.passwordChangedTemplate=true
        this.router.navigate(['/password-changed-successfully'])
        setTimeout(() => {
         
          this.router.navigate(['/login'])
          this.passwordChangedTemplate=false
        }, 5000);
        
      }, error: (error) => {
        console.log(error)
        alert(error.error.meta.message)
        this.passwordChangedTemplate=false

      }
    })
    this.swapVariableData=''
  }
}