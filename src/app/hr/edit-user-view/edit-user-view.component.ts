import{DatePipe}from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetailService } from 'src/app/admin/admin-service/company-detail.service';

@Component({
  selector: 'app-edit-user-view',
  templateUrl: './edit-user-view.component.html',
  styleUrls: ['./edit-user-view.component.css']
})
export class EditUserViewComponent implements OnInit {

  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  moddalValues:any
  departData: any;
  allEmployees: any;
  departId:any;
  EditUserForm:any;
  submitted:any
  company_id:any;
  data:any
  email:any
  id:any
  company_email_id:any
  constructor(private activatedRoute: ActivatedRoute, 
    private datePipe:DatePipe,private dashService:CompanyDetailService, private router: Router) {

    this.dashService.getbycmpnyid( this.company_id).subscribe((data) => {
      this.allEmployees = data;
      console.log("allEmployees", data);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.departId = x.get('id');
      console.log("x",x);
      console.log("x",x.get('id'));
     
      console.log("..........idk",this.departId);
    });

    console.log(this.id);
    
  //   this.dashService.getbycmpnyid(this.id).subscribe((data:any) => {    
  //     // this.departData = data[0];
  //     // for(let i in data){
  //     //   console.log("check data",data.id);
       
  //     // }
  //     console.log("arr length",data.length);
  //     let n=data.length;
  //     let limit=1;
     

  //     // for(let i in data){
  //     //   if(limit<=n && data[i].id==this.departId){
  //     //   console.log("check data",data[i].id);  
  //     //   this.departData = data[i];
  //     //   }  
  //     //   limit++;
  //     // }
  //   this.EditUserForm.patchValue({
  //     // 'id': this.departId,  
  //     'emp_name': this.departData.emp_name,
  //     'company_email_id': this.departData.company_email_id,  
     
  //   });
     
  // });

}



get f() { return this.EditUserForm.controls; }
  ngOnInit(): void {
    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.company_email_id=this.sessiondata[i].company_email_id;
this.roll=this.sessiondata[i].roll_id;
this.id = this.sessiondata[i].id;


      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
      this.EditUserForm = new FormGroup({
        // id:new FormControl(''),
        emp_name: new FormControl('',[Validators.required]),
        company_email_id: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        // modified_by:new FormControl(this.roll+'-'+this.emp_name),
       
    
    
      });
    this.patch()
  }


patch(){this.EditUserForm.patchValue({
  // 'id': this.departId,  
  'emp_name': this.emp_name,
  'company_email_id': this.company_email_id,  
 
});}
  





  updateusers(){

    console.log("adddepart", this.EditUserForm.value);

   
    
    
    let reqBody = {
      
      emp_name : this.EditUserForm.value.emp_name,
      company_email_id : this.EditUserForm.value.company_email_id,
      // modified_by:this.roll+'-'+this.emp_name,
     
    }

    this.submitted = true;

    // stop here if form is invalid

    if (this.EditUserForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.EditUserForm.valid) {
console.log("this.id",this.id,this.data);

    this.dashService.updateuser(this.id,reqBody).subscribe((data) => {
      console.log("getdepart" ,data );
      alert("User Successfully Updated.");
      this.router.navigate(['user-view']);
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
}