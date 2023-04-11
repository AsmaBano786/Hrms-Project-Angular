import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pending-report',
  templateUrl: './pending-report.component.html',
  styleUrls: ['./pending-report.component.css']
})
export class PendingReportComponent implements OnInit {
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
  status =['Pending','On-Hold','Approved','Reject']
selected=false;
  constructor(private dashServ: DashboardService,private router: Router,private datePipe: DatePipe) {

    // this.dashServ.GetPReport().subscribe((data) => {
    //   this.getpendingreport = data;
    //   // this.gpr = this.getpenrepo?.data
      
    //   console.log("getPR+++", this.getpendingreport);
    //   // console.log("getPR+++", this.gpr);

    // });
    
   }



  goto(emp_id:any,leave_id:any,action:any){
    
    console.log("data",action.value)
    
   let Action_Val = {
    Action:action.value
   }
   
   console.log("check action..",Action_Val);
   
    this.dashServ.UpdatePendingReport(emp_id,leave_id,Action_Val).subscribe((result)=>{
      console.log("api--->",result);
      alert("Thank You, Pending Action has been changed")
      // this.router.navigate(['/pending-report']);
      setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/pending-report'])); }, 2000);

    })



  }



  ngOnInit(): void {
    this.dashServ.approvForReq(this.action).subscribe((data:any) => {
      this.apFrReq = data;
      console.log("pending Actions",this.apFrReq)

      for(let i of this.apFrReq)
      {
       this.date_from= this.datePipe.transform(i.date_from, 'yyyy-MM-dd')
       this.date_to=this.datePipe.transform(i.date_to, 'yyyy-MM-dd') 
      }
    });
  }

 

}
