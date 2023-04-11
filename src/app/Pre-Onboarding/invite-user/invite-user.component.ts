import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { City } from 'country-state-city';
import { zip } from 'rxjs';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css','../../../assets/css/admin.min.css', '../../../assets/css/style.css']
})

export class InviteUserComponent implements OnInit {
  pass1:any;usermailid1:any;
  registerForm:any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private authService:AuthServiceService,private router: Router) { 
    
  }
//Add user form actions
get f() { return this.registerForm.controls; }
  ngOnInit(): void {


    this.authService.CompanyMailingDetailsGet().subscribe(async result => {
     
      if(result) {
        // console.log("CompanyMailingDetailsGet");
        
    console.log(result);
    console.log("get....data",result.data.companyOfficialEmail,result.data.password);
  
    this.usermailid1=result.data.companyOfficialEmail,
    this.pass1=result.data.password
    console.log("......IN.......",this.usermailid1);

    this.registerForm = this.formBuilder.group({
      usermailid:this.usermailid1,
      pass:this.pass1,
      FirstName:[''],
      LastName:['', [Validators.required,Validators.minLength(3)]],
      Email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Password: ['', [Validators.required,Validators.minLength(6)]]
     
    
    
      });
   }})
   
   

   
   
  }


  get usermailid() { return this.registerForm.get('usermailid'); }
  get pass() { return this.registerForm.get('pass'); }
  get FirstName() { return this.registerForm.get('FirstName'); }
  get LastName() { return this.registerForm.get('LastName'); }
  get Email() { return this.registerForm.get('Email'); }
  get Password() { return this.registerForm.get('Password'); }


inviteProcess(){
   
  this.submitted = true;
 // stop here if form is invalid
// if (this.registerForm.invalid) {
//   console.log()
//   return  alert("Invalid Details");;

// }
//True if all the fields are filled
if(this.submitted && this.registerForm.valid)
{
 // alert("Great, You are logged in!!");
 this.getcompanyMainlingInfo();
  console.log("checked",this.registerForm.value)

  this.authService.InviteUser(this.registerForm.value).subscribe(async result => {
  // console.log(this.registerForm.value);
    if(result.success) {
  console.log(result);
  console.log(result.message);
 
 
  }else{
    console.log(result);
    console.log (result.message);
    
    // this.router.navigateByUrl('login');
  
    this.getcompanyMainlingInfo();
    this.reset();
   
    alert("Thank You, Candidate Details Registered Successfully")
  }
  });
  // alert("Great, You are registered successfully");
  
  // this.router.navigateByUrl('login');
}
else{
  return  alert("Invalid Details");;
}

}
keyPressAlphabet(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-zA-Z]/.test(input)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}



getcompanyMainlingInfo()
{

  this.registerForm.patchValue({usermailid:this.usermailid1})
  this.registerForm.patchValue({pass:this.pass1})

console.log(".............",this.usermailid1,this.pass1);

}
reset(){
  this.registerForm.reset();
  this.registerForm = this.formBuilder.group({
    usermailid:this.usermailid1,
    pass:this.pass1,
    FirstName:[''],
    LastName:['', [Validators.required,,Validators.minLength(3)]],
    Email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    Password: ['', [Validators.required,Validators.minLength(6)]]
    });
  this.registerForm.get('FirstName').clearValidators(); 
            
    this.registerForm.get('LastName').clearValidators(); 
    
    this.registerForm.get('Email').clearValidators(); 
    
    this.registerForm.get('Password').clearValidators(); 
    
}


}

 
 




