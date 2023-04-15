// import { Component, OnInit } from '@angular/core';
import{DatePipe}from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetailService } from 'src/app/admin/admin-service/company-detail.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  company_id:any;
  company_email_id:any;
  id:any

  a:any
  getpenrepo:any
  alldata:any

  constructor(private activatedRoute: ActivatedRoute, 
    private datePipe:DatePipe,private dashService:CompanyDetailService, private router: Router) { }

  ngOnInit(): void {
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        // this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
// this.company_email_id=this.sessiondata[i].company_email_id;
this.company_id=this.sessiondata[i].company_id;
this.id=this.sessiondata[i].id;

      }
      this.getdetail()
  }


  getdetail() {
    this.dashService.getbycmpnyid(this.id).subscribe((data: any): void => {
      this.alldata = data;

      this.getpenrepo = data;
      this.a = data
      console.log("getPR+++", data);
      console.log("getdetail", this.a);
      this.company_email_id=data.data.company_email_id
      this.emp_name=data.data.emp_name
    });

  }


  deletecmpny(j: any) {
    console.log(j);
    // this.ngxService.start();
    //  if (confirm("Are you sure to delete this Leave?")) {
    this.dashService.Deleteusers(j).subscribe(async (result) => {
      setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/user-view'])); }, 1000);

      console.log('deleted successfully');
      this.getdetail();

    });
    // }
    alert("User Details Deleted Successfully")
    // this.getdetail();
    // this.ngxService.stop();
  }
}
