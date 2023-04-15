import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDate } from 'date-fns';
import { LeaveService } from '../leaveservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leave-tracker-onboarding',
  templateUrl: './leave-tracker-onboarding.component.html',
  styleUrls: ['./leave-tracker-onboarding.component.css']
})
export class LeaveTrackerOnboardingComponent implements OnInit {
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  all_leave: any;
  allEmployees: any;
  status: boolean = false;
  leave_type: any;
  lName:any;
  objAll:any;
  filteredData:any;
  company_id:any;
  constructor(private LeaveService: LeaveService, private ngxService: NgxUiLoaderService, private router: Router) {


    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
this.company_id=this.sessiondata[i].company_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.LeaveService.getById(this.emp_id,this.company_id).subscribe((data) => {

      this.all_leave = data;


    });

  }
  ngOnInit(): void {

  }

  deleteleave(employee_id: any) {

    this.LeaveService.deleteleave(employee_id).subscribe(res => {
      console.log("Res", res);
      alert("Leave Successfully Deleted");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/leave-tracker-onboarding']));
      }, 1000);
    }, (err) => {
      console.log("Err", err);
    })
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
