import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDate } from 'date-fns';
import { LeaveService } from '../leaveservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {


  leaveForm = new FormGroup({
    employee_id: new FormControl('', [Validators.required]),
    employee_name: new FormControl('', [Validators.required]),
    leave_type: new FormControl('', [Validators.required]),
    date_from: new FormControl('', [Validators.required]),
    Days: new FormControl('', [Validators.required]),

  });
  compid:any;
  getid:any;
  leave_type: any;
  filteredData: any;
  status:boolean=false;
  objAll:any;
  all_leave: any;
  allapply: any;

  lName:any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  company_id:any;
  constructor(private LeaveService: LeaveService,  private dash: DashboardService, private ngxService: NgxUiLoaderService, private router: Router) {

    this.LeaveService.Totalleave().subscribe((data: any) => {

      this.allapply = data;
      console.log(this.allapply);

    });

   

  }
  ngOnInit(): void {
    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
// this.company_id=this.sessiondata[i].company_id;
this.getid=this.sessiondata[i].id;

    }

    console.log("hr session data..", this.emp_id, this.emp_name, this.roll);
    this.getComid();
   
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

    console.log(this.leave_type);

    if(this.status==false){
    let leave_type_val = {
      leave_type: this.leave_type
    }

    this.LeaveService.findBySearch(leave_type_val).subscribe((data) => {
      this.filteredData = data
      console.log(data);
    });
  }
  else{
    this.SearchALL();
  }
  }




  deleteleave(employee_id: any) {

    this.LeaveService.deleteleave(employee_id).subscribe(res => {
      console.log("Res", res);
      alert("Leave Successfully Deleted");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/leave-application']));
      }, 1000);
    }, (err) => {
      console.log("Err", err);
    })
  }



  SearchALL() {

    this.objAll = {

      leave_type:this.lName,
    };

    this.LeaveService.HrfindAllSearch(this.objAll).subscribe(async (res1: any) => {

      console.log(res1);

      this.filteredData = res1;

     

    });

  }
  getComid(){

    console.log("checking",this.getid);
    
    this.dash.getEmp_byId(this.getid).subscribe((data: any) => {
      this.compid = data.data.company_id;
   
      console.log("this.company_id",this.compid);
       

       this.LeaveService.getleave(this.compid).subscribe((data) => {

        this.all_leave = data;
        console.log("leave applications",this.all_leave)
  
      });
    })
    
  }
}















