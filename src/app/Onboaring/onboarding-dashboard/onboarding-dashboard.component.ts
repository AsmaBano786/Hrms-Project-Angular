import{DatePipe}from '@angular/common';
import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";
import { ActivatedRoute } from "@angular/router";
import { NgModule } from '@angular/core';
import { Router } from "express";
import { switchAll, timestamp } from "rxjs";
import swal from 'sweetalert2';
import { timer } from 'rxjs';
import { TimesheetService } from '../time-sheet/services/timesheet.service';
import { getDate } from "date-fns";
@Component({
  selector: 'app-onboarding-dashboard',
  templateUrl: './onboarding-dashboard.component.html',
  styleUrls: ['./onboarding-dashboard.component.css']
})
export class OnboardingDashboardComponent implements OnInit {
  t1:any;
  
  action:any="Pending";
  roll:any;
  TotalLeave:any;
  attendencPcent:any;
  curdate:any;
  createdateA:any;
  sessiondata:any;
  emp_id:any;
  emp_name:any;
  sdata:any;
  leaves1: any = null;
  birthday: any;
  newHire: any;
  moddalValues: any;
  bdayWsModel:any;
  knCenter: any;
  apFrReq: any;
  upHday: any;
  Tsheet: any;
  announce: any;
  timesheetemp:any;
  startStopFlag : boolean =false;
  editMode: boolean = false;
  date: any;
  redblue = "btn btn-info btn-sm";

  startTimer: boolean = false;

  timer = 0; // seconds
  intervalId : any = 0;
  ticks =0;
  currentDate = new Date();

  constructor(private dashServ: DashboardService, private datePipe:DatePipe,
    private router:ActivatedRoute,private timesheetService : TimesheetService) {
    
    this.dashServ.leaves().subscribe((data) => {
      // this.leaves=totalLeav;
      console.log("check...." + data);
      this.leaves1 = data;
    });

    this.dashServ.birthday().subscribe((data) => {
      console.log("check....", data);
      this.birthday = data;
      console.log(this.birthday);
    });

    this.dashServ.newHire().subscribe((data) => {
      this.newHire = data;
      console.log("new hire....", data);
    });

    this.dashServ.knowledgecenter().subscribe((item:any) => {
      // console.log('item..................',JSON.stringify(item?.data));
      
      this.knCenter = item?.data;
       console.log("knowledge center",this.knCenter)
    });

    
   
    this.dashServ.UpcmgHoliday().subscribe((data) => {
      this.upHday = data;
      console.log("holiday", data);
    });

   


    this.dashServ.announcement().subscribe((data) => {
      this.announce = data;
      console.log("announcement", data);
    });

  }

  sndBdayWs(data:any){
    this.bdayWsModel = data;
    // this.name = data.name;

    console.log("bday user id ---->",data);
    }

    userlogin(data:any){
  
      console.log("click",data);
      this.dashServ.sendBdayWish(data).subscribe((result)=>{
        console.log("api--->",result);
        alert("Thank You...You have sended wish successfully")
  
      })
    }
  
   
    alertWithSuccess(){
      swal.fire("Thank You...","You Submitted Successfully","success")
      // alert("Your Email has been sent Successfully !!");
      
  


    }
   
    

  goto(data: any) {
    this.moddalValues = data;
    console.log("test", data);
  }


  start() {


    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    // let day =weekday[currentDate.getDay()];
    
   this.curdate=this.datePipe.transform(currentDate,'yyyy-MM-dd')
   console.log("curdate",this.curdate);
   
  let daycount=currentDate.getDay();
console.log("checkinT",time);
    let sun=0;      
    let mon=0;       
     let tue =0;      
    let wed=0;     
    let thu=0;      
    let fri =0;       
    let sat =0; 
    // if(daycount==0){
    // sun=1;mon=0;tue=0;wed=0;thu=0;fri=0;sat=0
    // }

    switch (daycount) {
    
      case 0:
        sun = 1;
        break;
      case 1:
        mon =1;
        break;
      case 2:
        tue =1;
        break;
      case 3:
        wed =1;
        break;
      case 4:
        thu =1;
        break;
      case 5:
        fri =1;
        break;
      case  6:
        sat =1;
        break;
default:
sun=0;
mon=0;
tue=0;
wed=0;
thu=0;fri=0;sat=0




    }
console.log(sun,mon,tue,wed,thu,fri,sat)

      
    this.startStopFlag =! this.startStopFlag;
    if (!this.intervalId){
      this.intervalId = setInterval(() => this.timer++, 1000);
      
      
      this.editMode=true;
      
      this.redblue = "btn btn-danger btn-sm"
    }
    else {
      clearInterval(this.intervalId);
      this.intervalId = 0;
      this.editMode=false;
      this.redblue = "btn btn-info btn-sm"
      console.log( "time.....",this.timer);
    }


    console.log("this.createdateA",this.createdateA)
    console.log("currentDate",this.curdate);
    this.GetAttendence();
if(this.createdateA==this.curdate){
 
  console.log("date is same",this.t1);
  



  let ureq={
    checkout:time,
    total_hours:this.t1,
    created_date:this.createdateA,
  }
 this.dashServ.updateAttendence(this.emp_id,ureq).subscribe((udata)=>{
  console.log("AttendenceDetails..updating.", udata);
  this.GetAttendence();
})
}
else{
console.log("date is Different then inserting data");
  let req={
    emp_id:this.emp_id,
    emp_name:this.emp_name,
    checkin:time,
    created_date:this.datePipe.transform(new Date(),'yyyy-MM-dd'),
    roll:"employee",  
    department:"development",
    holiday:0,
    leave:0,
    sun,mon,tue,wed,thu,fri,sat,   
  }; 
this.dashServ.AttendenceDetails(req).subscribe((data) => {
  console.log("AttendenceDetails..inserting.", data);
  this.GetAttendence();
});

}
  
this.GetTotalHrs();
  }

  // stop() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //     this.intervalId = 0;
  //   }
  // }

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

    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.getTotalLeave();
    
   
   
    this.dashServ.timesheetbyempid(this.emp_id).subscribe((data) => {
      this.timesheetemp = data;
      console.log("timesheetemp",this.timesheetemp)
      console.log("tm",this.emp_id);
      
    });

    this.dashServ.EmployeeapprovForReq(this.emp_id,this.action).subscribe((data:any) => {
      this.apFrReq = data;
      console.log("apFrReq",this.apFrReq)
      console.log(",,,,,,,,,,",this.emp_id,this.action)
    });

  
      this.GetAttendence();
    
      this.GetTotalHrs();

    this.startStopFlag = true;
    let timer$ = timer(2000,1000);
    timer$.subscribe(t=>this.ticks = t);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }


  GetAttendence(){
    this.curdate=this.datePipe.transform(new Date(),'yyyy-MM-dd')
    this.dashServ.GetAttendence(this.emp_id,this.curdate).subscribe((gdata:any)=>{
      console.log("AttendenceDetails..fetched.", gdata);
      for(let i in gdata){
       
        this.createdateA = this.datePipe.transform(gdata.created_date,'yyyy-MM-dd')
        console.log("this.createdateA", this.createdateA);
        let totalhours=gdata.total_hours;
        let checkintime=gdata.checkin;
        let checkouttime=gdata.checkout;

// checkintime=new Date().getHours();
        
let s=checkintime.split(':')
let t=(+s[0])*3600+(+s[1])*60+(+s[2])

let sout=checkouttime.split(':')
let tout=(+sout[0])*3600+(+sout[1])*60+(+sout[2])

let diff=tout-t;//sec

console.log("diff",diff);

// multiply by 1000 because Date() requires miliseconds
var date = new Date(diff * 1000);
let hh:any = date.getUTCHours();
var mm:any = date.getUTCMinutes();
var ss:any = date.getSeconds();
// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
// if (hh > 12) {hh = hh % 12;}
// These lines ensure you have two-digits
if (hh < 10) {hh = "0"+hh;}
if (mm < 10) {mm = "0"+mm;}
if (ss < 10) {ss = "0"+ss;}
// This formats your string to HH:MM:SS
this.t1 = hh+":"+mm+":"+ss;

 
        console.log("........",this.t1);
        
      }
     })


     
  }



  GetTotalHrs(){

    
    this.dashServ.GetAttendTotalhrs(this.emp_id).subscribe((Tdata:any)=>{
      console.log("Attendence.TotalHOURS and count.fetched.", Tdata);

      let monthlyThrs=(Tdata.totalhours).split(':')
      let mth=(+monthlyThrs[0])*3600+(+monthlyThrs[1])*60+(+monthlyThrs[2])
console.log("new....",mth);

let monthlycount=(Tdata.totalhrscount)
let cth=(monthlycount)*3600
console.log("new..c..",cth);


this.attendencPcent=(mth/cth)*100
console.log("percent",this.attendencPcent)

    })
  }
  getTotalLeave(){
    this.dashServ.totalLeaveAdded().subscribe( (result:any) => {
  
      if (result) {
        console.log(result);
        
        // console.log("TotalLeave",result.TotalLeave);
        this.TotalLeave=result.TotalLeave;
      }
      else {
        console.log("error", result);        
      }
  })
  }


 

}



