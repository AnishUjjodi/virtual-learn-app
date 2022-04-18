import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractControl, FormBuilder, } from '@angular/forms'
import ConfirmedValidator from 'src/app/login/confirmedValidator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-profile-side-navigation',
  templateUrl: './profile-side-navigation.component.html',
  styleUrls: ['./profile-side-navigation.component.scss']
})
export class ProfileSideNavigationComponent implements OnInit {

fullname:any;
Username:any;
EmailID:any;
MobileNumber:any;
occupation:any;
DOB:any;
course:any;
  chapters: any;
  test: any;
  NavbarIcon:any;
  editOrChangepassword:any;
  profileImgSrc: any;
  facebookLink: any;
  twitterLink: any;
  gender: any;
  privacyOrTOS:any;
  checked = true;
  fileData:any


  profileForm: FormGroup = new FormGroup({
    fullname:new FormControl(''),
    username:new FormControl(''),
    email: new FormControl(''),
    mobileNumber: new FormControl(''),
    occupation: new FormControl(''),
    gender: new FormControl(''),
    DOB: new FormControl(''),
    twitterLink:new FormControl(''),
    facebookLink:new FormControl('')
  });
 

  public changepasswordForm!: FormGroup;
  formControlNameError: any;
  isFormSubmitted: boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private MatDialogRef:MatDialogRef<ProfileSideNavigationComponent>, public formBuilder: FormBuilder, private http:HttpClient,private commonService:CommonService) {
  
   console.log(data)
  this.NavbarIcon=data.NavbarIcon;
  this.getprofileInfo()
   }
   ngOnInit(): void {
    console.log(this.profileForm.value)
   
    this.changepasswordForm = this.formBuilder.group({
      currentPassword:['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/)], Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
      isPasswordCorrect:['Anishu123']
    }
      ,
      {
        validators: [ConfirmedValidator.match('newPassword', 'confirmPassword'), ConfirmedValidator.match('isPasswordCorrect', "currentPassword")],


      })
    console.log(this.profileForm.controls)
    console.log("onInit")
   
    }
  
  closeModal(){
    this.MatDialogRef.close()
  }
  EditORchangePassword(data:any){
    this.editOrChangepassword=data;
  }
  resetPassword(){
    this.isFormSubmitted=true;
    let ResetPasswordUrl ="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myProfile/changePassword"

    let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
    this.http.post(ResetPasswordUrl, {
      "currentPassword": this.changepasswordForm.get('currentPassword')!.value,
      "password": this.changepasswordForm.get('newPassword')!.value,
      "confirmPassword": this.changepasswordForm.get('confirmPassword')!.value,
     
 
    }, { headers: headers }).subscribe({
      next: (res:any={}) => {
        console.log(res)
        alert(res.meta.message)
        
      }, error: (error) => {

        alert(error)
      }
    })
    
  }
  onSubmit(){
    
   
    // console.log(this.profileForm.value)
    // console.log(this.changepasswordForm.controls)
    // console.log(this.changepasswordForm)
    // console.log(this.changepasswordForm.valid)

  }
  get f(): { [key: string]: AbstractControl } {
      
    return this.changepasswordForm.controls;
  }
  Onfocus(formControlName:any){
    console.log(formControlName)
    if(this.changepasswordForm.errors!=null){
      
    }
    this.formControlNameError=formControlName
  }
  onSubmitProfileForm(){
    
    let editProfileUrl ="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/editProfile"

    let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
    this.http.post(editProfileUrl, {
      "email": this.profileForm.get('email')!.value,
      "phone": this.profileForm.get('mobileNumber')!.value.replaceAll(" ", ""),
      "occupation": this.profileForm.get('occupation')!.value,
      "gender": this.profileForm.get('gender')!.value,
      "dob": this.profileForm.get('DOB')!.value,
      "twitterLink": this.profileForm.get('twitterLink')!.value,
      "facebookLink": this.profileForm.get('facebookLink')!.value,
    }, { headers: headers }).subscribe({
      next: (res) => {
        console.log(res)
        this.getprofileInfo();
      }, error: (error) => {

        alert(error)
      }
    })
  }
  checkImgae(event:any){
    this.fileData=<File>event.target.files[0]
    const fd=new FormData();
    fd.append('image',this.fileData,this.fileData.name)
    let url="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myProfile/edit/profileImage"
    let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
    this.http.patch<any>(url, fd, { headers: headers }).subscribe({
      next: (res:any={}) => {
      console.log("hi this is put request", res);
      this.getprofileInfo()
    }, error: (error:any) => {
      console.log(error)
    }
    })
  }
  // checkkk(){
  //   console.log(this.fileData)
  //   const fd=new FormData();
  //   fd.append('image',this.fileData,this.fileData.name)
  //   let url="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myProfile/edit/profileImage"
  //   let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
  //   this.http.patch<any>(url, fd, { headers: headers }).subscribe({
  //     next: (res:any={}) => {
  //     console.log("hi this is put request", res);
  //     this.getprofileInfo()
  //   }, error: (error:any) => {
  //     console.log(error)
  //   }
  //   })
  // }
 getprofileInfo(){
  let profileDataUrl ="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/myProfile"
  let headers = new HttpHeaders({ 'Authorization': "jwt "+localStorage.getItem('login jwtToken')})
  this.http.get(profileDataUrl, { headers: headers }).subscribe({
    next: (res:any={}) => {
     
     
      this.fullname=res.data.fullName;
      this.commonService.fullnameSend(this.fullname)
      // this.commonService.fullname=this.fullname
      this.Username= res.data.userName;
      this.EmailID=res.data.email;
      this.MobileNumber=res.data.phone;
      this.course=res.data.course;
      this.chapters=res.data.chapters;
      this.test=res.data.testCompleted;
      this.profileImgSrc=res.data.profilePicture;
      this.occupation= res.data.occupation;
      this.DOB=res.data.dob;
      this.facebookLink= res.data.facebookLink;
      this.twitterLink=res.data.twitterLink;
      this.gender=res.data.gender;


      this.profileForm = this.formBuilder.group({ 
        fullname:[this.fullname],
        username:[this.Username],
        email: [this.EmailID, [Validators.required, Validators.email]],
        mobileNumber: ['+91 '+this.MobileNumber.slice(-10) , [Validators.required, Validators.pattern("^[+][9][1][ ][6-9]{1}[0-9]{9}$")]],
        occupation: [this.occupation],
        gender: [this.gender],
        DOB:[this.DOB , [Validators.required, Validators.pattern(/^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/)]],
       
        twitterLink: [this.twitterLink],
        facebookLink:[ this.facebookLink]
     
      }, );
    }, error: (error:any) => {
      alert(error)
    }
  })
 }
 onChange(value: boolean) {
 console.log(value)
}
isPrivacyOrTOS(data:any){
  
 this.privacyOrTOS=data
}
}
