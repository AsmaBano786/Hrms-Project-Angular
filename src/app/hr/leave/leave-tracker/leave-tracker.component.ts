import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDate } from 'date-fns';
import { LeaveService } from '../leaveservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leave-tracker',
  templateUrl: './leave-tracker.component.html',
  styleUrls: ['./leave-tracker.component.css']
})
export class LeaveTrackerComponent implements OnInit {
  status: boolean = false;
  leave_type: any;
  lName:any;
  filteredData: any;

  all_leave: any;
  allEmployees: any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  eName: any;
  objAll: any;
  company_id:any;
  constructor(private LeaveService: LeaveService, private ngxService: NgxUiLoaderService, private router: Router) {




  }
  ngOnInit(): void {
    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
this.company_id=this.sessiondata[i].company_id;

    }

    console.log("hr session data..", this.emp_id, this.emp_name, this.roll);
    this.LeaveService.getById(this.emp_id,this.company_id).subscribe((data) => {

      this.all_leave = data;


    });

    this.FindAll();
  }

  search1(evt: any) {
    console.log("Evt", evt.target.value);
    this.leave_type = evt.target.value;

    if (evt.target.value == '' || evt.target.value == undefined) {

      console.log('...', evt.target.value);

      this.lName = evt.target.value;

      this.status = true;

    }
  }
  FindAll() {

    console.log("FindAll", this.emp_id);

    this.LeaveService.getById(this.emp_id,this.company_id).subscribe((data) => {

      this.all_leave = data;


    });

  }





  search() {

    if(this.status==false){

  
    console.log(this.leave_type);

    let leave_type_val = {
      leave_type: this.leave_type,
      employee_id: this.emp_id,
    }

    this.LeaveService.findBySearchID(leave_type_val).subscribe((data) => {
      this.filteredData = data
      console.log(data);
    });
  }
  else{
    this.SearchALL();
  }


  }


  SearchALL() {

    this.objAll = {

      leave_type:this.lName,
      employee_id: this.emp_id,

    };

    this.LeaveService.findAllSearch(this.objAll).subscribe(async (res1: any) => {

      console.log(res1);

      this.filteredData = res1;

      console.log('true', this.status, this.filteredData);

    });

  }
}
