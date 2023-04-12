import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  // obj:any;
  // timeZoneOffset:any;
  // btndisable:boolean=false;
  // registerForm:any = FormGroup;
  // submitted = false;
  constructor(private formBuilder: FormBuilder,private router: Router) { }
//Add user form actions
// get f() { return this.registerForm.controls; }
  ngOnInit(): void {


    // this.timeZoneOffset= new Date().getTimezoneOffset();
    // console.log("timezone...",this.timeZoneOffset)



    // sessionStorage.clear();
    // this.registerForm = this.formBuilder.group({
    //   fName:['', [Validators.required,Validators.minLength(3)]],
    //   lName:['', [Validators.required,Validators.minLength(3)]],
    //   Designation:['', [Validators.required]],
    //   Email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    //   Phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]{10,12}')]]
    //   });
  }

//   fillDetails(){
    
//   this.submitted = true;
//  // stop here if form is invalid
// if (this.registerForm.invalid) {
  
//   return  console.log("Invalid Details");
// } 

// //True if all the fields are filled
// if(this.submitted && this.registerForm.valid)
// {
//  // alert("Great, You are logged in!!");

//  console.log("form data",this.registerForm.value);
//   this.obj=this.registerForm.value;
// sessionStorage.setItem('sessionData',JSON.stringify([this.obj]))   

 
// }
 
//   this.router.navigateByUrl('test2');
 
// }
// //key press validation
// keyPressNumbers (event: any){
//   var charCode = (event.which) ? event.which : event.keyCode;
//   // Only Numbers 0-9
//   if ((charCode < 48 || charCode > 57)) {
//     event.preventDefault();
//     return false;
//   } else {
//     return true;
//   }
// }
// keyPressAlphabetOnly(event:any){
//   var input = String.fromCharCode(event.keyCode)
//   if (/[a-zA-Z]/.test(input)) {
//   return true;
//   } else {
//  event.preventDefault();
//   return false;
//    }
//   }
// keyPressAlphabet(event:any){
//   var input = String.fromCharCode(event.keyCode)
//   if (/[a-z A-Z]/.test(input)) {
//   return true;
//   } else {
//  event.preventDefault();
//   return false;
//    }
//   }

  
}




