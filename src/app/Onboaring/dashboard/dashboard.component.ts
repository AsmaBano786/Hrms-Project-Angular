import { JsonPipe } from '@angular/common';
import { Component, OnInit,ViewChild} from '@angular/core';
import { HostListener } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
// import { Router } from "express";
import { switchAll } from 'rxjs';
import swal from 'sweetalert2';
import { timer } from 'rxjs';
// import { TimesheetService } from '../time-sheet/services/timesheet.service';
import { TimesheetService } from '../time-sheet/services/timesheet.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CompanyDetailService } from 'src/app/admin/admin-service/company-detail.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // @ViewChild('closeModel')closemodal: Element | any;
  // @ViewChild('closeModel', { static: true }) closemodal: Element | undefined;
  CompanyDomain:any;
  gotcomId:any;
  action: any = 'Pending';
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  TotalLeave: any;
  leaves1: any = null;
  birthday: any;
  newHire: any;
  moddalValues: any;
  bdayWsModel: any;
  knCenter: any;
  apFrReq: any;
  upHday: any;
  Tsheet: any;
  announce: any;
  timesheetemp: any;
  startStopFlag: boolean = false;
  editMode: boolean = false;
  date: any;
  redblue = 'btn btn-info btn-sm';
  company_id: any;
  startTimer: boolean = false;
  company_modal: boolean = false;
  timer = 0; // seconds
  intervalId: any = 0;
  ticks = 0;
  currentDate = new Date();
  companyinfo: any = FormGroup;
  CompanyId: any;
  submitted: any;
  emailId: any;
  id: any;
  SendEmailDomain:any;
  EmailId:any;
  DomainBroke:any;
  gotCdomain:any;
  constructor(
    private dashServ: DashboardService,
    private formBuilder: FormBuilder,
    private companyService: CompanyDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private timesheetService: TimesheetService
  ) {
    // $('#MymodalPreventHTML').modal('show');

    // this.company_modal = true
    this.dashServ.leaves().subscribe((data: any) => {
      // this.leaves=totalLeav;

      this.leaves1 = data;
      console.log('check....', this.leaves1);
    });

    this.dashServ.newHire( this.company_id).subscribe((data) => {
      this.newHire = data;
      console.log('new hire....', data);
    });

    this.dashServ.knowledgecenter(this.company_id).subscribe((item: any) => {
      // console.log('item..................',JSON.stringify(item?.data));

      this.knCenter = item?.data;
      console.log('knowledge center', this.knCenter);
    });

    this.dashServ.UpcmgHoliday(this.company_id).subscribe((data) => {
      this.upHday = data;
      console.log('holiday', data);
    });

    // this.dashServ.announcement(this.company_id).subscribe((data) => {
    //   this.announce = data;
    //   console.log('announcement', data);
    // });
  }

  sndBdayWs(data: any) {
    this.bdayWsModel = data;
    // this.name = data.name;

    console.log('bday user id ---->', data);
  }

  userlogin(data: any) {
    console.log('click', data);
    this.dashServ.sendBdayWish(data).subscribe((result) => {
      console.log('api--->', result);

      alert('Thank You...You have sended wish successfully');
    });
  }

  alertWithSuccess() {
    swal.fire('Thank You...', 'You Submitted Successfully', 'success');
    // alert("Your Email has been sent Successfully !!");
  }

  goto(data: any) {
    this.moddalValues = data;
    console.log('test', data);
  }

  start() {
    this.startStopFlag = !this.startStopFlag;
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.timer++, 1000);
      this.editMode = true;

      this.redblue = 'btn btn-danger btn-sm';
    } else {
      clearInterval(this.intervalId);
      this.intervalId = 0;
      this.editMode = false;
      this.redblue = 'btn btn-info btn-sm';
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }

  get hours() {
    return Math.floor(this.timer / 3600);
  }

  get minutes() {
    return Math.floor(this.timer / 60) % 60;
  }

  get seconds() {
    return this.timer % 60;
  }

  ngOnInit() {

    this.sessiondata = JSON.parse(
      sessionStorage.getItem('local_storage') || '[]'
    ); //recieve
    console.log('local_storage data', this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
      // this.company_id=this.sessiondata[i].company_id;
      this.emailId = this.sessiondata[i].company_email_id;
      this.id = this.sessiondata[i].id;
    }

    this.getCompany_id()
    // this.dashServ.getEmp_byId(this.id).subscribe((data: any) => {
    //   this.company_id = data.data.company_id;
    //   console.log("this.company_id",this.company_id);
    //   if (this.company_id === 'null') {
    //     console.log("this.company_id==='null'");
  
    //     document.getElementById('MybtnPreventHTML')?.click();
    //   }
    // });

    // if (this.company_id === 'null') {
    //   console.log("this.company_id==='null'");

    //   document.getElementById('MybtnPreventHTML')?.click();
    // }
    console.log('hr session data..', this.emp_id, this.emp_name, this.roll);
    this.getTotalLeave();

    this.dashServ.birthday().subscribe((data: any) => {
      console.log('check...birthday.', data);
      this.birthday = data;
      console.log(this.birthday);
    });
   this.announcement();
    this.dashServ.approvForReq(this.action).subscribe((data: any) => {
      this.apFrReq = data;
      console.log('pending Actions', this.apFrReq);
    });

    this.dashServ.timesheetgetAll().subscribe((data) => {
      this.timesheetemp = data;
      console.log('timesheetemp', this.timesheetemp);
    });

    this.startStopFlag = true;
    let timer$ = timer(2000, 1000);
    timer$.subscribe((t) => (this.ticks = t));

    this.companyinfo = new FormGroup({
      company_name: new FormControl('', [Validators.required]),
      company_email:new FormControl('', [Validators.required]),
      portal: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      number_of_employee: new FormControl('', [Validators.required]),
    });
  }
getCompany_id(){
  this.dashServ.getEmp_byId(this.id).subscribe((data: any) => {
    this.company_id = data.data.company_id;
    this.EmailId=data.data.company_email_id;
    console.log("this.company_id",this.company_id,this.EmailId);


    let Esplit=this.EmailId;
  let splitdomainname=Esplit.split("@");
  // console.log(splitdomainname)
  // console.log("index",splitdomainname[1]);
  let breakdot=splitdomainname[1].split('.')
  // console.log("check.",breakdot);
  // console.log("check.",breakdot[0]);
  this.DomainBroke=breakdot[0];
  console.log("DomainBroke",this.DomainBroke);

  this.companyService.getDomain(this.DomainBroke).subscribe((data:any) => {    
      
    console.log("data",data);
    for(let i of data){
      console.log(i.company_domain);
      this.gotCdomain=i.company_domain;
      this.gotcomId=i.company_id;
    }
    console.log("admin",this.DomainBroke,"their comapny status",this.gotCdomain);


    if(this.DomainBroke!=this.gotCdomain)  //both have different domain
{
  document.getElementById('MybtnPreventHTML')?.click();

}
else{

  let reqbody={
    company_id: this.gotcomId,
  }
  console.log("popup donot open",this.emailId, reqbody);
  
  this.companyService
  .updateCredentials(this.emailId, reqbody)
  .subscribe((res: any) => {
    console.log(res);
    console.log(res.message);
       
  });
}





    })

    
// if(this.DomainBroke===this.gotCdomain) //both have same domain
// {
// console.log("dont show popup this time");
// }

    // if (this.company_id==='null') {
    //   console.log("this.company_id==='null'");

    //   document.getElementById('MybtnPreventHTML')?.click();
    // }
  });
}


  //---------------------------------------------
  submit(data: any) {
    let companyId = this.companyinfo.value.company_name;
    let cid = companyId.split('', 3);
    console.log('splitted', cid);

    let ran = Math.floor(Math.random() * 1000) + 1;
    console.log(ran);

    let abc = cid.join('') + ran;
    this.CompanyId = abc.toUpperCase();
    console.log(this.CompanyId);

    console.log('data company', this.companyinfo.value);
    this.domain();


    this.submitted = true;

    if (this.companyinfo.invalid) {
      console.log('Invalid Details');
    }


    if (this.submitted && this.companyinfo.valid) {
      let reqBody = {
        ...this.companyinfo.value,
        company_id: this.CompanyId,
        company_domain:this.SendEmailDomain
      };

      console.log('valid data', reqBody);
      this.ngxService.start()
      this.companyService.companyInfo(reqBody).subscribe((result: any) => {
        if (result) {
          console.log(result);
          console.log(result.message);
          if (
            
            result.message === 'This email already exist with this company!'
          ) {
            this.router.navigate(['company-info']);
            this.ngxService.stop()

            return alert('This email already exist with this company!');

          }
          if (result.message === 'Company details added successfully!') {
            console.log('onBoardData', this.emailId, this.CompanyId);

            let body = {
              company_id: this.CompanyId,
            };
            console.log(
              'this.emailId,this.CompanyId',
              this.emailId,
              this.CompanyId
            );

            this.companyService
              .updateCredentials(this.emailId, body)
              .subscribe((res: any) => {
                console.log(res);
                console.log(res.message);
                this.ngxService.stop()
                document.getElementById('modalClose')?.click();
               

                
              });
              // this.closemodal?.nativeElement.click();
            // return this.router.navigate(['/dashboard']);
          }
        }
      });
    }
  }
  announcement(){ this.dashServ.announcement(this.company_id).subscribe((data) => {
    this.announce = data;
    console.log('announcement', data);
  });}
 
  //------------------------------------------

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  getTotalLeave() {
    this.dashServ.totalLeaveAdded().subscribe((result: any) => {
      if (result) {
        console.log(result);

        // console.log("TotalLeave",result.TotalLeave);
        this.TotalLeave = result.TotalLeave;
      } else {
        console.log('error', result);
      }
    });
  }


  domain(){
    // let CEmail="abc@gmail.com";
    let CEmail=this.companyinfo.value.company_email;
  let splitdomain=CEmail.split("@");
  // console.log(splitdomain)
  // console.log("index",splitdomain[1]);
  let breakdot=splitdomain[1].split('.')
  // console.log("check.",breakdot);
  // console.log("check.",breakdot[0]);
  this.SendEmailDomain=breakdot[0];
  console.log("sendingthisdomain",this.SendEmailDomain);
  }





  
}
