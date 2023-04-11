
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/dist/css/admin.min.css', '../../../assets/dist/css/style.css'],

})
export class LoginComponent implements OnInit {
 a:any;
 b:any;
 c:any;
 obj:any;
 
  // constructor(private authService:AuthServiceService) { }
  //Form Validables 
registerForm:any = FormGroup;
submitted = false;
constructor( 
  private formBuilder: FormBuilder,
  private authService:AuthServiceService,
  private router: Router,
  private route:ActivatedRoute,
  private ngxService: NgxUiLoaderService,
  ){


}
//Add user form actions
get f() { return this.registerForm.controls; }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }
///...................
loginProcess(){
    
  this.submitted = true;
 // stop here if form is invalid
if (this.registerForm.invalid) {
console.log("invalid email or password");

} 
//True if all the fields are filled
if(this.submitted && this.registerForm.valid)
{
 // alert("Great, You are logged in!!");
 // console.log(this.registerForm.value)
// this.ngxService.start();
  this.authService.login(this.registerForm.value).subscribe(async result => {
  // console.log(this.registerForm.value);
  // this.ngxService.stop();
    if(result.success) {
  console.log(result);
  console.log(result.message);
  this.obj = result.success
  console.log(this.obj);
  for(const i in this.obj)
  {
      var a=this.obj[i].FirstName
      var b=this.obj[i].LastName
      var c=this.obj[i].Email


    
//  console.log( this.a,this.b,this.c);
    }
  
  // alert("Great, You are logged in successfully");
  // this.router.navigateByUrl('PreOnboarding',this.a);
  // console.log( this.a,this.b);
  // let data=this.a+" "+this.b
  let data = {a,b,c}
  
  // let DEmail=this.c;
  // console.log(data);
  // console.log(DEmail);
  // this.router.navigate(['/PreOnboarding'],{queryParams: {data:data}})

  // this.commonService.getToastPopup('Login successful','','success');
  this.router.navigate(['/PreOnboarding'],{queryParams: {data:btoa(JSON.stringify(data))}})
  

  }else{
    console.log(result);
    console.log (result.message);
    alert("Invalid Email or password");
  }
  });
 
}

}
// newChange(): void {
//   this.router.navigateByUrl('PreOnboarding');
// } 
}