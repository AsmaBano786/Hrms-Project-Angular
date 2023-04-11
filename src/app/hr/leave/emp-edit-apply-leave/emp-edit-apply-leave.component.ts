import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../leaveservice.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-emp-edit-apply-leave',
  templateUrl: './emp-edit-apply-leave.component.html',
  styleUrls: ['./emp-edit-apply-leave.component.css']
})
export class EmpEditApplyLeaveComponent implements OnInit {

  submitted: any;
  date_from: any;
  
  company_email_id: any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  
  leaveData: any;
  //  allEmployees: any;
  allleave: any;
  employee_id: any;
  
  ApplyLeaveId: any;
  editApplyleave: any;
  
  
  // editApplyleave = new FormGroup({
  //   employee_id: new FormControl(''),
  //   emp_name: new FormControl(''),
  //   leave_type: new FormControl(''),
  //   date_from: new FormControl(''),
  //   date_to: new FormControl(''),
  //   reporting_manager: new FormControl(''),
  //   email: new FormControl(''),
  //   additional_email: new FormControl(''),
  //   reason_for_leave: new FormControl(''),
  //   poc_employee: new FormControl(''),
  //   poc_mobile: new FormControl(''),
  //   poc_email: new FormControl(''),
  // });
  
  constructor(private activatedRoute: ActivatedRoute, private LeaveService: LeaveService, private router: Router, private datepipe: DatePipe) {
  
    // this.LeaveService.getEmployees().subscribe((data) => {
    //   this.allEmployees = data;
    //   console.log("allEmployees", data);
    // });
  
    this.LeaveService.getleave().subscribe((data) => {
      this.allleave = data;
      console.log("allEmployees", data);
    });
  
  
    this.activatedRoute.paramMap.subscribe(x => {
      this.ApplyLeaveId = x.get('ApplyLeaveId');
      console.log(this.ApplyLeaveId);
    });
  
    this.LeaveService.getleave().subscribe((data: any) => {
      // console.log(data);
      this.leaveData = data;
     
      console.log("arr length", data.length);
      let n = data.length;
      let limit = 1;
  
      for (let i in data) {
        if (limit <= n && data[i].ApplyLeaveId == this.ApplyLeaveId) {
          console.log("check data", data[i].ApplyLeaveId);
          this.leaveData = data[i];
        }
        limit++;
      }
  
      this.editApplyleave.patchValue({
        'ApplyLeaveId': this.ApplyLeaveId,
        'employee_id': this.leaveData.employee_id,
        'emp_name': this.leaveData.emp_name,
        'leave_type': this.leaveData.leave_type,
        'date_from': this.datepipe.transform(this.leaveData.date_from, 'yyyy-MM-dd'),
        'date_to': this.datepipe.transform(this.leaveData.date_to, 'yyyy-MM-dd'),
        'reporting_manager': this.leaveData.reporting_manager,
        'email': this.leaveData.email,
        'additional_email': this.leaveData.additional_email,
        'reason_for_leave': this.leaveData.reason_for_leave,
        'poc_employee': this.leaveData.poc_employee,
        'poc_mobile': this.leaveData.poc_mobile,
        'poc_email': this.leaveData.poc_email,
        'Action': this.leaveData.Action,
        'describe_reason': this.leaveData.describe_reason,
      });
  
    });
  
  
  
    // this.LeaveService.getById(this.ApplyLeaveId).subscribe((data: any) => {
    //   this.leaveData = data[0];
  
    //   this.editApplyleave.patchValue({
    //     'ApplyLeaveId': this.ApplyLeaveId,
    //     'employee_id': this.leaveData.employee_id,
    //     'emp_name': this.leaveData.emp_name,
    //     'leave_type': this.leaveData.leave_type,
    //     'date_from': this.datepipe.transform(this.leaveData.date_from, 'yyyy-MM-dd'),
    //     'date_to': this.datepipe.transform(this.leaveData.date_to, 'yyyy-MM-dd'),
    //     'reporting_manager': this.leaveData.reporting_manager,
    //     'email': this.leaveData.email,
    //     'additional_email': this.leaveData.additional_email,
    //     'reason_for_leave': this.leaveData.reason_for_leave,
    //     'poc_employee': this.leaveData.poc_employee,
    //     'poc_mobile': this.leaveData.poc_mobile,
    //     'poc_email': this.leaveData.poc_email,
    //   });
    //   console.log("leaveData", this.leaveData);
    // });
  
    /*this.projectsService.getProjects().subscribe((data) => {
      this.leaveData = data;
      console.log("leaveData", data);
    });*/
  }
  
  get f() { return this.editApplyleave.controls; }
  
  ngOnInit(): void {
  
    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);
  
    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
      this.company_email_id = this.sessiondata[i].company_email_id;
  
    }
  
    // this.LeaveService.getById_emp(this.emp_id).subscribe((data: any) => {
    //   this.leaveData = data[0];
  
    //   console.log(this.leaveData);
    //   console.log("getById_emp", this.leaveData);
    // });
  
  
    this.editApplyleave = new FormGroup({
      ApplyLeaveId: new FormControl(''),
      employee_id: new FormControl(''),
      emp_name: new FormControl(''),
      leave_type: new FormControl('', [Validators.required]),
      date_from: new FormControl('', [Validators.required]),
      date_to: new FormControl('', [Validators.required]),
      reporting_manager: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      additional_email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      reason_for_leave: new FormControl('', [Validators.required]),
      poc_employee: new FormControl(''),
      poc_mobile: new FormControl(''),
      poc_email: new FormControl(''),
      Action: new FormControl(''),
      describe_reason: new FormControl(''),
  
    });
  
  
  }
  
  updateLeave() {
    console.log("addProject", this.editApplyleave
      .value);
    // let team = this.editApplyleave.value.team_member?.toString()
    let leaveData = {
      ApplyLeaveId: this.ApplyLeaveId,
      employee_id: this.emp_id,
      emp_name: this.emp_name,
      leave_type: this.editApplyleave.value.leave_type,
      date_from: this.editApplyleave.value.date_from,
      date_to: this.editApplyleave.value.date_to,
      reporting_manager: this.editApplyleave.value.reporting_manager,
      email: this.editApplyleave.value.email,
      additional_email: this.editApplyleave.value.additional_email,
      reason_for_leave: this.editApplyleave.value.reason_for_leave,
      poc_employee: this.editApplyleave.value.poc_employee,
      poc_mobile: this.editApplyleave.value.poc_mobile,
      poc_email: this.editApplyleave.value.poc_email,
      Action: this.editApplyleave.value.Action,
      describe_reason: this.editApplyleave.value.describe_reason,
    }
  
    this.submitted = true;
  
    // stop here if form is invalid
  
    if (this.editApplyleave.invalid) {
  
      console.log("Invalid Details");
  
    }
  
    if (this.submitted && this.editApplyleave.valid) {
  
      this.LeaveService.updateApplyLeave(leaveData).subscribe((data) => {
        console.log("getApplyLeave", leaveData);
        console.log("getApplyLeave", data);
        alert("Leave Updated Successfully.");
        this.router.navigate(['leave-application']);
      });
    }
  }
  
  
  
  
  
  }
  