import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {ServicesService } from 'src/app/Onboaring/onboarding-services/services.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  pass1:any;usermailid1:any;
  res:any;
  msg:any;
 resetForm:any = FormGroup;
  submitted = false;
  joiningMode:boolean=false;
  todayDate:any;
  yearDate:any;
  confirm_Password:any;
  original_Password:any;
  // CustomValidators:any
  constructor(private formBuilder: FormBuilder,private authService:ServicesService,private router: Router,  private datePipe:DatePipe) { }
//Add user form actions

  ngOnInit(): void {

    this.authService.CompanyMailingDetailsGet().subscribe(async (result:any) => {
     
      if(result) {
        // console.log("CompanyMailingDetailsGet");
        
    console.log(result);
    console.log("get....data",result.data.companyOfficialEmail,result.data.password);
  
    this.usermailid1=result.data.companyOfficialEmail,
    this.pass1=result.data.password
    console.log("......IN.......",this.usermailid1);

    this.resetForm = this.formBuilder.group({
      usermailid:this.usermailid1,
      pass:this.pass1,
      emp_name:['null'],
      emp_id:['null'],
      joining_date:[''],
      location:['null'],
      roll_id:['Admin'],
      designation:['null'],
      company_email_id: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirm_password: ['', [Validators.required,Validators.minLength(6)]],
      

      phone_number: ['null'],
      checkbox: [1],
      personal_email_id: ['null'],
      
      created_by:['Admin']
    });
    
   }})




  }

  get employee_type() { return this.resetForm.get('employee_type'); }
  get marital_status() { return this.resetForm.get('marital_status'); }
  get gender() { return this.resetForm.get('gender'); }
  get age() { return this.resetForm.get('age'); }



  get usermailid() { return this.resetForm.get('usermailid'); }
  get pass() { return this.resetForm.get('pass'); }
  get f() { return this.resetForm.controls; }
  get company_email_id() {
    return this.resetForm.get('company_email_id');
  }
  get designation() {
    return this.resetForm.get('designation');
  }
  get employee_status() {
    return this.resetForm.get('employee_status');
  }
  get emp_name() {
    return this.resetForm.get('emp_name');
  }
  get emp_id() {
    return this.resetForm.get('emp_id');
  }
  get joining_date() {
    return this.resetForm.get('joining_date');
  }
  get location() {
    return this.resetForm.get('location');
  }
  get roll_id() {
    return this.resetForm.get('roll_id');
  }
  get password() {
    return this.resetForm.get('password');
  }
  get confirm_password() {
    return this.resetForm.get('confirm_password');
  }
  get phone_number() {
    return this.resetForm.get('phone_number');
  }
  get checkbox() {
    return this.resetForm.get('checkbox');
  }
  get personal_email_id() {
    return this.resetForm.get('personal_email_id');
  }
  get created_by() {
    return this.resetForm.get('created_by');
  }





putProcess(){
  // console.log("this.resetForm.password.value",this.resetForm.value.password);
    
  this.submitted = true;
 // stop here if form is invalid
if (this.resetForm.invalid) {
  return  console.log("Invalid Details");;

} 
//True if all the fields are filled
if(this.submitted && this.resetForm.valid)
{
  
  if(this.resetForm.value.password ==this.resetForm.value.confirm_password){
console.log("password match");

  
 // alert("Great, You are logged in!!");
//  this.getcompanyMainlingInfo();
  console.log("function",this.resetForm.value)

  let email=this.resetForm.value.company_email_id;
  let body={password:this.resetForm.value.password,
    confirm_password:this.resetForm.value.confirm_password}
  this.authService.updatepassword(email,body).subscribe(async (result:any) => {
  // console.log(this.resetForm.value);
  console.log("function1",email,body)

    if(result) {

  alert("Password updated successfully");
  this.router.navigate(['login-Onboarding']);
  console.log(result);
  console.log(result.message);

  }
  else{
    console.log("error");
    
    
    // this.getcompanyMainlingInfo();
  
    
// this.authService.updateEmployee(this.resetForm.value.personal_email_id,empID).subscribe(async (result:any) => {
//       console.log(result);
//       console.log (result.message)
//     })

    // alert("Thank You..."+","+"You Submitted Details Successfully");

    this.resetRoll();
    
  }
// if (result) {
//   console.log(result);
//   console.log(result.message);

 
//   if(result.message==="Company Email is already exist")
//   {
//     this.res===result.message;
//     this.msg==="Company Email is already exist";
//     this.router.navigate(['employee-registration']);
//     return alert("This Email is already exist");
  

// }
// else
// {
//   this.router.navigate(['login-Onboarding']);
//   return alert("You have registered successfully");
  
// }

// }
  });
  }
  else {

    // alert ("Confirm password did not match")
    this.original_Password=this.resetForm.value.password;
    this.confirm_Password=this.resetForm.value.confirm_password;
  }
  // this.router.navigateByUrl('login-Onboarding');
 
}

}

// reset(){
//   // this.resetForm.reset(); 
//   this.router.navigateByUrl('/login-Onboarding');

// }
//bug fixing

keyPressAlphabet(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-z A-Z]/.test(input)) {
  return true;
  } else {
 event.preventDefault();
  return false;
   }
  }


  
keyPressAlphaNumeric(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-zA-Z0-9]/.test(input)) {
  return true;
  } else {
 event.preventDefault();
  return false;
   }
  }




  JoiningDate(e:any){
    let year = new Date(e)
    let today = new Date()
  //  console.log('current', today);
  //    console.log('by user', year);
    this.todayDate= this.datePipe.transform(today,'yyyy-MM-dd')
    this.yearDate=this.datePipe.transform(year,'yyyy-MM-dd')

    console.log('current', this.todayDate);
     console.log('by user', this.yearDate);
    if(this.todayDate>this.yearDate)
    {
      this.joiningMode=true;
      console.log("joiningerror")
    }
    else{
      this.joiningMode=false;
    }
  }
  // getcompanyMainlingInfo()
  // {
  
  //   this.resetForm.patchValue({usermailid:this.usermailid1})
  //   this.resetForm.patchValue({pass:this.pass1})
  
  // console.log(".............",this.usermailid1,this.pass1);
  
  // }
  resetRoll(){
    this.resetForm.reset();
    this.resetForm = this.formBuilder.group({
      usermailid:this.usermailid1,
      pass:this.pass1,
      emp_name:['', [Validators.required]],
      emp_id:['null'],
      joining_date:[''],
      location:['null'],
      roll_id:['Admin'],
      designation:['null'],
      company_email_id: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirm_password: ['', [Validators.required,Validators.minLength(6)]],
      phone_number: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),]],
      checkbox: ['',[Validators.required]],
      personal_email_id: ['null'],
      created_by:['admin']
    });
      this.resetForm.get('emp_name').clearValidators(); 
            
    this.resetForm.get('emp_id').clearValidators(); 
    
    this.resetForm.get('joining_date').clearValidators(); 
    
    this.resetForm.get('location').clearValidators(); 
    this.resetForm.get('roll_id').clearValidators(); 
            
    this.resetForm.get('designation').clearValidators(); 
    
    this.resetForm.get('company_email_id').clearValidators(); 
    
    this.resetForm.get('password').clearValidators(); 
    this.resetForm.get('confirm_password').clearValidators();
    
    this.resetForm.get('personal_email_id').clearValidators(); 
    this.resetForm.get('employee_status').clearValidators(); 
    this.resetForm.get('employee_type').clearValidators(); 
    this.resetForm.get('marital_status').clearValidators(); 
    this.resetForm.get('gender').clearValidators(); 
    this.resetForm.get('created_by').clearValidators(); 
  }

}


  




