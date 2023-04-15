import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/Pre-Onboarding/login/login.component';
import { DashboardService } from "src/app/services/dashboard.service";
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  allemployeedata:any;
  alldata:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  departData: any;
  allEmployees: any;
  departId:any;
  EditDepartmentForm:any;
  submitted:any
  company_id: any;
  constructor(private activatedRoute: ActivatedRoute,   private authService: AuthServiceService,private dashService:DashboardService, private router: Router) {
    
    this.dashService.Department(this.company_id).subscribe((data) => {
      this.allEmployees = data;
      // console.log("allEmployees", data);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.departId = x.get('departmentId');
      console.log("x",x);
      console.log("x",x.get('departmentId'));
     
      console.log("..........id",this.departId);
    });
    

}


get f() { return this.EditDepartmentForm.controls; }
  ngOnInit(): void {
     
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
this.company_id = this.sessiondata[i].company_id;
      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
      this.getdetail();
      this.getdetailDepartment();
      this.EditDepartmentForm = new FormGroup({
        // departmentId:new FormControl(''),
        departmentName: new FormControl('',[Validators.required]),
        MailAlias: new FormControl('',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        
        DepartmentLead: new FormControl(''),
        ParentDepartment: new FormControl(''),
        modified_by:new FormControl(this.roll+'-'+this.emp_name),
           
      });
  }

  updateDepartment(){

    console.log("adddepart", this.EditDepartmentForm.value);

    let departData = {
      departmentId : this.departId,
     
      departmentName : this.EditDepartmentForm.value.departmentName,
      MailAlias : this.EditDepartmentForm.value.MailAlias,
      DepartmentLead: this.EditDepartmentForm.value.DepartmentLead,
      ParentDepartment: this.EditDepartmentForm.value.ParentDepartment,
      modified_by:this.roll+'-'+this.emp_name,
     
    }
    console.log("updating",departData);



    
    this.submitted = true;

    // stop here if form is invalid

    if (this.EditDepartmentForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.EditDepartmentForm.valid) {
    this.dashService.updateDepartment(departData).subscribe((data) => {
      console.log("getdepart" , departData);
      alert("Department Successfully Updated.");
      this.router.navigate(['department']);
    });
  }
  }
  getdetail() {
    this.authService.getAllJoiners(this.company_id).subscribe((data: any): void => {
      this.allemployeedata = data;
    
      console.log("getdetail........employee name.....", this.allemployeedata);
      
    });
}


getdetailDepartment() {
  console.log(this.company_id);
  
  this.dashService.Department(this.company_id).subscribe((data: any): void => {
    this.alldata = data;

   
    console.log('depart',this.alldata);

    for(let d of data)
    this.EditDepartmentForm.patchValue({
      // 'departmentId': this.departId,  
      'departmentName': d.departmentName,
      'MailAlias': d.MailAlias,  
      'DepartmentLead':d.DepartmentLead,
      'ParentDepartment':d.ParentDepartment,
    });
   
  });


  // this.dashService.Department(this.company_id).subscribe((data:any) => {  
  //   console.log(data);  
  //   // this.departData = data;
  //   console.log("arr length",data.length);
  //   let n=data.length;
  //   let limit=1;
   
  //   for(let i in data){
  //     if(limit<=n && data[i].departmentId==this.departId){
  //     console.log("check data",data[i].departmentId);  
  //     this.departData = data[i];
  //     }  
  //     limit++;
  //   }
  // this.EditDepartmentForm.patchValue({
  //   // 'departmentId': this.departId,  
  //   'departmentName': this.departData.departmentName,
  //   'MailAlias': this.departData.MailAlias,  
  //   'DepartmentLead':this.departData.DepartmentLead,
  //   'ParentDepartment':this.departData.ParentDepartment,
  // });
   
// });
}
}