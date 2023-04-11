
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/Pre-Onboarding/login/login.component';
import { AddScheduleService } from '../add-schedule.service'; 

@Component({
  selector: 'app-edit-add-schedule',
  templateUrl: './edit-add-schedule.component.html',
  styleUrls: ['./edit-add-schedule.component.css']
})
export class EditAddScheduleComponent implements OnInit {
  etime:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  departData: any;
  allEmployees: any;
  departId:any;
  EditscheduleForm:any;
  submitted:any
  constructor(private activatedRoute: ActivatedRoute, private dashService:AddScheduleService, private router: Router) {
    
}


get f() { return this.EditscheduleForm.controls; }
  ngOnInit(): void {
     
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);




      this.dashService.getAddschedule().subscribe((data) => {
        this.allEmployees = data;
        // console.log("allEmployees", data);
      });
  
      this.activatedRoute.paramMap.subscribe(x => {
        this.departId = x.get('AddScheduleId');
        console.log("x",x);
        console.log("x",x.get('AddScheduleId'));
       
        console.log("..........id",this.departId);
      });
      this.dashService.getAddschedule().subscribe((data:any) => {  
        console.log(data);  
        // this.departData = data;
        console.log("arr length",data.length);
        let n=data.length;
        let limit=1;
       
        for(let i in data){
          if(limit<=n && data[i].AddScheduleId==this.departId){
          console.log("check data",data[i].AddScheduleId);  
          this.departData = data[i];
          }  
          limit++;
        }
      this.EditscheduleForm.patchValue({
        // 'departmentId': this.departId,  
        'ScheduleName': this.departData.ScheduleName,
        'TimeofSchedule': this.departData.TimeofSchedule,  
        'LeaveType':this.departData.LeaveType,
        'LeaveID':this.departData.LeaveID,
        'Date':this.departData.Date,
      });
       
    });
  
      this.EditscheduleForm = new FormGroup({
        // departmentId:new FormControl(''),
        ScheduleName: new FormControl('',[Validators.required]),
        TimeofSchedule: new FormControl('',[Validators.required]),
        LeaveType: new FormControl('',[Validators.required]),
        LeaveID: new FormControl('',[Validators.required]),
        Date: new FormControl('',[Validators.required]),
        modified_by:new FormControl(this.roll+'-'+this.emp_name),
           
      });
  }

  updateSche(){

    console.log("adddepart", this.EditscheduleForm.value);

    let departData = {
      AddScheduleId : this.departId,
     
      ScheduleName:this.EditscheduleForm.value.ScheduleName,
      TimeofSchedule:this.EditscheduleForm.value.TimeofSchedule ,
      LeaveType: this.EditscheduleForm.value.LeaveType,
      LeaveID: this.EditscheduleForm.value.LeaveID,
      Date:this.EditscheduleForm.value.Date ,
      modified_by:this.roll+'-'+this.emp_name,
     
    }
    console.log("updating",departData);



    
    this.submitted = true;

    // stop here if form is invalid

    if (this.EditscheduleForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.EditscheduleForm.valid) {
    this.dashService.updateAddschedule(departData).subscribe((data) => {
      console.log("getdepart" , departData);
      alert("Schedule Successfully Updated.");
      this.router.navigate(['add-schedule-view']);
    });
  }
  }
}
