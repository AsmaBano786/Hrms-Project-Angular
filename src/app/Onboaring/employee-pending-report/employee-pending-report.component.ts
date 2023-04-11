import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-pending-report',
  templateUrl: './employee-pending-report.component.html',
  styleUrls: ['./employee-pending-report.component.css']
})
export class EmployeePendingReportComponent implements OnInit {

  
  roll:any;
  sessiondata:any;
  emp_id:any;
  emp_name:any;
  action:any="Pending"
  date_to:any
  date_from:any
  apFrReq:any;
  // productForm: FormGroup;
  employeeID: any

  getpendingreport:any
  gpr:any
  selectedvalue:any
  empdetail:any
selAction = {Action:""}
  status =['Pending','On-Hold','Approved','Cancel']
selected=false;
  constructor(private dashServ: DashboardService,private router: Router,private datePipe: DatePipe) {

    
   }




  ngOnInit(): void {
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.dashServ.EmployeeapprovForReq(this.emp_id,this.action).subscribe((data:any) => {
      this.apFrReq = data;
      console.log("apFrReq",this.apFrReq)
      console.log(",,,,,,,,,,",this.emp_id,this.action)
    
      for(let i of this.apFrReq)
      {
       this.date_from= this.datePipe.transform(i.date_from, 'yyyy-MM-dd')
       this.date_to=this.datePipe.transform(i.date_to, 'yyyy-MM-dd') 
      }
    });
  }

 

}

