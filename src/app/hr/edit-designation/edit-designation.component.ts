import{DatePipe}from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "src/app/services/dashboard.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  moddalValues:any
  departData: any;
  allEmployees: any;
  departId:any;
  EditDesignationForm:any;
  submitted:any
  company_id:any;
  constructor(private activatedRoute: ActivatedRoute,  private ngxService: NgxUiLoaderService,

    private datePipe:DatePipe,private dashService:DashboardService, private router: Router) {

    
      
    // this.dashService.Designations(this.company_id).subscribe((data) => {
    //   this.allEmployees = data;
    //   console.log("allEmployees", data);
    // });

}



get f() { return this.EditDesignationForm.controls; }
  ngOnInit(): void {
    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
this.company_id=this.sessiondata[i].company_id;
      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
      this.EditDesignationForm = new FormGroup({
        // id:new FormControl(''),
        designation_name: new FormControl('',[Validators.required]),
        mail_alias: new FormControl('',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        modified_by:new FormControl(this.roll+'-'+this.emp_name),
       
    
    
      });



      
    this.activatedRoute.paramMap.subscribe(x => {
      this.departId = x.get('id');
      console.log("x",x);
      console.log("x",x.get('id'));
     
      console.log("..........idk",this.departId);
      this.getdesig();
    });
    
   
  }

  updateDesignation(){

    console.log("adddepart", this.EditDesignationForm.value);

   
    
    
    let departData = {
      id : this.departId,
      designation_name : this.EditDesignationForm.value.designation_name,
      mail_alias : this.EditDesignationForm.value.mail_alias,
      modified_by:this.roll+'-'+this.emp_name,
     
    }

    this.submitted = true;

    // stop here if form is invalid

    if (this.EditDesignationForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.EditDesignationForm.valid) {
      this.ngxService.start();
    this.dashService.updateDesignations(departData).subscribe((data) => {
      console.log("getdepart" , departData);
      this.ngxService.stop();
      alert("Designation Successfully Updated.");
      this.router.navigate(['designation']);
    });
  }
  }

  goto(data: any) {
    this.moddalValues = data;
    console.log("test", data);
  }

  keyPressAlphaNumeric(event:any){
    var input = String.fromCharCode(event.keyCode)
    if (/[a-z A-Z0-9]/.test(input)) {
    return true;
    } else {
   event.preventDefault();
    return false;
     }
    }


    getdesig(){
      console.log(this.departId);
    this.dashService.DesignationsId(this.departId).subscribe((data:any) => {    

      console.log("desig data",data);
      
      // this.departData = data[0];
      // for(let i in data){
      //   console.log("check data",data.id);
       
      // }
      console.log("arr length",data.length);
      let n=data.length;
      let limit=1;
     
for(let i of data)
{
  console.log(i.designation_name);
  console.log(i.mail_alias);
  this.EditDesignationForm.patchValue({
   
    'designation_name':i.designation_name,
    'mail_alias':i.mail_alias,  
   
  });
}

    
     
  });
    }
}