import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DatePipe } from '@angular/common';


import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TimesheetService } from '../services/timesheet.service';

@Component({
  selector: 'app-update-timesheet',
  templateUrl: './update-timesheet.component.html',
  styleUrls: ['./update-timesheet.component.css']
})
export class UpdateTimesheetComponent implements OnInit {
  startStopFlag: boolean = false;
  timer = 0; // seconds
  intervalId: any = 0;
  nik: any
  moddalValues: any
  departData: any;
  allEmployees: any;
  departId: any;
  projectData:any
 

  EdittimesheetForm = new FormGroup({

    Date: new FormControl(''),
    Clients: new FormControl(''),
    Project: new FormControl(''),
    Task: new FormControl(''),
    WorkingHours: new FormControl(''),
   
  });
  constructor(private activatedRoute: ActivatedRoute, private timesheetService: TimesheetService, private router: Router,private datepipe: DatePipe) {

    this.timesheetService.getTimesheet1().subscribe((data) => {
      this.allEmployees = data
      console.log("allEmployees",  data.length);
    });

    
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((x:any) => {
      this.departId = x.get('id');
      console.log("x", x);
      console.log("x", x.id);

      console.log("..........idk", this.departId);
    });
this.update()

  }




update(){
  this.timesheetService.getTimesheet1().subscribe((data: any) => {
    console.log("arr length.......", data);
    let n =data.length;
    let limit = 1;

console.log(data.length,this.departId);

    for (let i in data) {
      if (limit <= n && data[i].TimeSheetId == this.departId) {
        console.log("check data", data[i].TimeSheetId,data[i].Clients,data[i].Project);
       
      

    this.EdittimesheetForm.patchValue({
      // 'id': this.departId,  
      'Date': this.datepipe.transform(data[i].Date,'yyyy-MM-dd'),    
      'Clients': data[i].Clients,
     
      'Project': data[i].Project,
      'Task': data[i].Task,
      'WorkingHours': data[i].WorkingHours,

     
    });
  }
  limit++;
}
}
  )

}




  updateTimesheett() {

    console.log("adddepart", this.EdittimesheetForm.value);

    let departData = {
      TimeSheetId: this.departId,
      Date: this.EdittimesheetForm.value.Date,
      Project: this.EdittimesheetForm.value.Project,
      Clients: this.EdittimesheetForm.value.Clients,
      Task: this.EdittimesheetForm.value.Task,
      WorkingHours: this.EdittimesheetForm.value.WorkingHours,

     

    }
    this.timesheetService.updateTimesheet(departData).subscribe((data) => {
      console.log("getdepart", departData);
      alert("Timesheet Successfully Updated.");
      this.router.navigate(['timesheet']);
    });
  }

  goto(data: any) {
    this.moddalValues = data;
    console.log("test", data);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
  get hours() {
    return Math.floor(this.timer / 3600)
  }

get minutes() {
    return Math.floor(this.timer / 60) % 60;
  }

get seconds() {
    return this.timer % 60;
  }

  checkTimeSheet() {

 this.start();
  }

  start() {
    this.startStopFlag = !this.startStopFlag;

    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.timer++, 1000);
    }
    else {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }

}

