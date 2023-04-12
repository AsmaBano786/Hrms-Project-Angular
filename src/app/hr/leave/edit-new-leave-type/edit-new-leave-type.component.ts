import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../leaveservice.service';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-new-leave-type',
  templateUrl: './edit-new-leave-type.component.html',
  styleUrls: ['./edit-new-leave-type.component.css']
})

export class EditNewLeaveTypeComponent implements OnInit {

  company_email_id: any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;


  submitted: any;
  date_from: any;
  leaveType: any;

  datanewleaveType: any;
  editnewleaveType: any;
  id: any;


  constructor(private datepipe: DatePipe, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private LeaveService: LeaveService, private ngxService: NgxUiLoaderService, private router: Router) {

    this.LeaveService.getAllnewleavetype().subscribe((data) => {
      this.leaveType = data;
      console.log("allEmployees", this.leaveType);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.id = x.get('id');
      console.log(this.id);
    });

    this.LeaveService.getAllnewleavetype().subscribe((data: any) => {
      // console.log(data);
      this.datanewleaveType = data;

      console.log("arr length", data.length);
      let n = data.length;
      let limit = 1;

      for (let i in data) {
        if (limit <= n && data[i].id == this.id) {
          console.log("check data", data[i].id);
          this.datanewleaveType = data[i];
        }
        limit++;
      }

      this.editnewleaveType.patchValue({
        'id': this.id,
        'name': this.datanewleaveType.name,
        'type': this.datanewleaveType.type,
        'code': this.datanewleaveType.code,
        'unit': this.datanewleaveType.unit,
        'balance': this.datanewleaveType.balance,
        'date_from': this.datepipe.transform(this.datanewleaveType.date_from, 'yyyy-MM-dd'),
        'date_to': this.datepipe.transform(this.datanewleaveType.date_to, 'yyyy-MM-dd'),
        'reason_for_leave': this.datanewleaveType.reason_for_leave,

      });

    });
  }

  get f() { return this.editnewleaveType.controls; }


  ngOnInit(): void {


    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
      this.company_email_id = this.sessiondata[i].company_email_id;

    }

    this.editnewleaveType = this.formBuilder.group({

      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      code: new FormControl(''),
      unit: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      date_from: ['', [Validators.required]],
      date_to: ['', [Validators.required]],
      reason_for_leave: new FormControl(''),

    });

  }



  changeUnit(evt: any) {
    console.log("Evt", evt.target.value);

  }
  changeBalance(evt: any) {
    console.log("Evt", evt.target.value);

  }

  updateLeave() {
    console.log("editnewleaveType", this.editnewleaveType
      .value);

    let datanewleaveType = {
      id: this.id,
      name: this.editnewleaveType.value.name,
      type: this.editnewleaveType.value.type,
      code: this.editnewleaveType.value.code,
      unit: this.editnewleaveType.value.unit,
      balance: this.editnewleaveType.value.balance,
      date_from: this.editnewleaveType.value.email,
      date_to: this.editnewleaveType.value.date_to,
      reason_for_leave: this.editnewleaveType.value.reason_for_leave,
     
    }

    this.submitted = true;

    // stop here if form is invalid

    if (this.editnewleaveType.invalid) {

      console.log("Invalid Details");

    }

    if (this.submitted && this.editnewleaveType.valid) {

      this.LeaveService.updateApplyLeave(datanewleaveType).subscribe((data) => {
        console.log("datanewleaveType", datanewleaveType);
        console.log("datanewleaveType", data);
        alert("Leave Type Updated Successfully.");
        // this.router.navigate(['leave-application']);
      });
    }
  }

}
