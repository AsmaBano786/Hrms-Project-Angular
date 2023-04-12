import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { LeaveService } from '../leaveservice.service';


@Component({
  selector: 'app-new-leave-type',
  templateUrl: './new-leave-type.component.html',
  styleUrls: ['./new-leave-type.component.css']
})
export class NewLeaveTypeComponent implements OnInit {

  date_from: any;
  submitted = false;

  company_email_id: any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;

  NewleaveType: any = FormGroup;

  // form = new FormGroup({
  //   gender: new FormControl('', Validators.required)
  // });

  constructor(private formBuilder: FormBuilder, private LeaveService: LeaveService, private ngxService: NgxUiLoaderService, private router: Router) { }

  get f() { return this.NewleaveType.controls; }

  ngOnInit(): void {

    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
      this.company_email_id = this.sessiondata[i].company_email_id;

    }

    this.NewleaveType = this.formBuilder.group({

      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      code: new FormControl(''),
      // profile: new FormControl(''),
      unit: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      date_from: ['', [Validators.required]],
      date_to: ['', [Validators.required]],
      reason_for_leave: new FormControl(''),

    });

  }


  submitData() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.NewleaveType.invalid) {
      return console.log("Invalid Details");
    }

    //True if all the fields are filled
    if (this.submitted && this.NewleaveType.valid) {
      // alert("Great, You are logged in!!");
      console.log(this.NewleaveType.value)
      // this.ngxService.start();
      // if (confirm("You have applied Leave successfully")) {
      this.LeaveService.newleaveTypeadd(this.NewleaveType.value).subscribe(result => {

        console.log('test-data', result);

        if (result) {

          console.log(result);

          console.log(result.message);

          if (result.message === "Leave Type already exist with this date!") {

            // this.router.navigate(['apply-leave']);

            return alert("Leave Type already exist with this date");

          }

          if (result.message === "New Leave Type added successfully!") {

            alert("New Leave Type added successfully");
            // setTimeout(() => {
            //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/apply-leave']));
            // }, 1000);
          }

        }


      });



    }
  }


  changeUnit(evt: any) {
    console.log("Evt", evt.target.value);

  }
  changeBalance(evt: any) {
    console.log("Evt", evt.target.value);

  }
}
