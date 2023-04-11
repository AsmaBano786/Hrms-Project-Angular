import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ServicesService } from 'src/app/Onboaring/onboarding-services/services.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Ng2TelInputModule} from 'ng2-tel-input';
@Component({
  selector: 'app-employee-registration-onboarding',
  templateUrl: './employee-registration-onboarding.component.html',
  styleUrls: ['./employee-registration-onboarding.component.css'],
})
export class EmployeeRegistrationOnboardingComponent implements OnInit {
  pass1: any;
  usermailid1: any;
  res: any;
  msg: any;
  event:any
  
  registerForm: any = FormGroup;
  submitted = false;
  joiningMode: boolean = false;
  todayDate: any;
  yearDate: any;
  confirm_Password: any;
  original_Password: any;
  // CustomValidators:any
  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private authService: ServicesService,
    private router: Router,
    private avhty:Ng2TelInputModule,
    private datePipe: DatePipe
  ) {}
  //Add user form actions

  ngOnInit(): void {
    this.authService
      .CompanyMailingDetailsGet()
      .subscribe(async (result: any) => {
        if (result) {
          // console.log("CompanyMailingDetailsGet");

          console.log(result);
          console.log(
            'get....data',
            result.data.companyOfficialEmail,
            result.data.password
          );

          (this.usermailid1 = result.data.companyOfficialEmail),
            (this.pass1 = result.data.password);
          console.log('......IN.......', this.usermailid1);

          this.registerForm = this.formBuilder.group({
            usermailid: this.usermailid1,
            pass: this.pass1,
            emp_name: ['', [Validators.required]],
            emp_id: ['null'],
            joining_date: [''],
            location: ['null'],
            roll_id: ['Admin'],
            designation: ['null'],
            company_email_id: [
              '',
              [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              ],
            ],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: [
              '',
              [Validators.required, Validators.minLength(6)],
            ],

            phone_number: [
              '',
              [
                Validators.required,
                Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
              ],
            ],
            checkbox: [1, [Validators.required]],
            personal_email_id: ['null'],

            created_by: ['Admin'],
          });
        }
      });
  }

  get employee_type() {
    return this.registerForm.get('employee_type');
  }
  get marital_status() {
    return this.registerForm.get('marital_status');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get age() {
    return this.registerForm.get('age');
  }

  get usermailid() {
    return this.registerForm.get('usermailid');
  }
  get pass() {
    return this.registerForm.get('pass');
  }
  get f() {
    return this.registerForm.controls;
  }
  get company_email_id() {
    return this.registerForm.get('company_email_id');
  }
  get designation() {
    return this.registerForm.get('designation');
  }
  get employee_status() {
    return this.registerForm.get('employee_status');
  }
  get emp_name() {
    return this.registerForm.get('emp_name');
  }
  get emp_id() {
    return this.registerForm.get('emp_id');
  }
  get joining_date() {
    return this.registerForm.get('joining_date');
  }
  get location() {
    return this.registerForm.get('location');
  }
  get roll_id() {
    return this.registerForm.get('roll_id');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirm_password() {
    return this.registerForm.get('confirm_password');
  }
  get phone_number() {
    return this.registerForm.get('phone_number');
  }
  get checkbox() {
    return this.registerForm.get('checkbox');
  }
  get personal_email_id() {
    return this.registerForm.get('personal_email_id');
  }
  get created_by() {
    return this.registerForm.get('created_by');
  }

  matchpass() {}

  inviteProcess() {
    // console.log("this.registerForm.password.value",this.registerForm.value.password);

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return console.log('Invalid Details');
    }
    //True if all the fields are filled
    if (this.submitted && this.registerForm.valid) {
      if (
        this.registerForm.value.password ==
        this.registerForm.value.confirm_password
      ) {
        console.log('password match');

        // alert("Great, You are logged in!!");
        //  this.getcompanyMainlingInfo();
        console.log('function', this.registerForm.value);

        this.ngxService.start();
        this.authService
          .onboarding_registeration(this.registerForm.value)
          .subscribe(async (result: any) => {
            // console.log(this.registerForm.value);
            console.log('function1', this.registerForm.value);

            if (result) {
              console.log(result);
              console.log(result.message);

              if (result.message === 'Company Email is already exist') {
                this.res === result.message;
                this.msg === 'Company Email is already exist';
                this.router.navigate(['employee-registration']);
                return alert('This Email is already exist');
              } else {
                this.ngxService.stop();
                this.router.navigate(['login-Onboarding']);
                return alert('You have registered successfully');
              }
            }
          });
      } else {
        // alert ("Confirm password did not match")
        this.original_Password = this.registerForm.value.password;
        this.confirm_Password = this.registerForm.value.confirm_password;
      }
      // this.router.navigateByUrl('login-Onboarding');
    }
  }

 

  keyPressAlphabet(event: any) {
    var input = String.fromCharCode(event.keyCode);
    if (/[a-z A-Z]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressAlphaNumeric(event: any) {
    var input = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  JoiningDate(e: any) {
    let year = new Date(e);
    let today = new Date();
    //  console.log('current', today);
    //    console.log('by user', year);
    this.todayDate = this.datePipe.transform(today, 'yyyy-MM-dd');
    this.yearDate = this.datePipe.transform(year, 'yyyy-MM-dd');

    console.log('current', this.todayDate);
    console.log('by user', this.yearDate);
    if (this.todayDate > this.yearDate) {
      this.joiningMode = true;
      console.log('joiningerror');
    } else {
      this.joiningMode = false;
    }
  }
  // getcompanyMainlingInfo()
  // {

  //   this.registerForm.patchValue({usermailid:this.usermailid1})
  //   this.registerForm.patchValue({pass:this.pass1})

  // console.log(".............",this.usermailid1,this.pass1);

  // }
  resetRoll() {
    this.registerForm.reset();
    this.registerForm = this.formBuilder.group({
      usermailid: this.usermailid1,
      pass: this.pass1,
      emp_name: ['', [Validators.required]],
      emp_id: ['null'],
      joining_date: [''],
      location: ['null'],
      roll_id: ['Admin'],
      designation: ['null'],
      company_email_id: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      checkbox: ['', [Validators.required]],
      personal_email_id: ['null'],
      created_by: ['admin'],
    });
    this.registerForm.get('emp_name').clearValidators();

    this.registerForm.get('emp_id').clearValidators();

    this.registerForm.get('joining_date').clearValidators();

    this.registerForm.get('location').clearValidators();
    this.registerForm.get('roll_id').clearValidators();

    this.registerForm.get('designation').clearValidators();

    this.registerForm.get('company_email_id').clearValidators();

    this.registerForm.get('password').clearValidators();
    this.registerForm.get('confirm_password').clearValidators();

    this.registerForm.get('personal_email_id').clearValidators();
    this.registerForm.get('employee_status').clearValidators();
    this.registerForm.get('employee_type').clearValidators();
    this.registerForm.get('marital_status').clearValidators();
    this.registerForm.get('gender').clearValidators();
    this.registerForm.get('created_by').clearValidators();
  }
  onCountryChange(event: any) {
    alert(event.dialCode);
  }

  hasError(event: any) {}

  getNumber(event: any) {}

  telInputObject(event: any) {}
}
