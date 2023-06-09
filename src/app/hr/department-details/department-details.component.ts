import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

import { AuthServiceService } from 'src/app/services/auth-service.service';



@Component({

  selector: 'app-department-details',

  templateUrl: './department-details.component.html',

  styleUrls: ['./department-details.component.css']

})

export class DepartmentDetailsComponent implements OnInit {
  alldata:any;
  allemployeedata:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  DepartmentDetails: any = FormGroup;

  submitted = false;
  company_id: any;



  constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private router: Router,    private authService: AuthServiceService,
    ) { }

  //Add user form actions

  get f() { return this.DepartmentDetails.controls; }



  ngOnInit(): void {




    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
this.company_id =this.sessiondata[i].company_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
      
  this.getdetail()
    this.DepartmentDetails = this.formBuilder.group({



      departmentName: ['', [Validators.required]],

      MailAlias:  ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      DepartmentLead: [''],

      ParentDepartment: [''],

      added_by:this.roll+'-'+this.emp_name

    });

  }



  
  get departmentName() {
    return this.DepartmentDetails.get('departmentName');
  }
  get MailAlias() {
    return this.DepartmentDetails.get('MailAlias');
  }
  get DepartmentLead() {
    return this.DepartmentDetails.get('DepartmentLead');
  }
  get ParentDepartment() {
    return this.DepartmentDetails.get('ParentDepartment');
  }


  submitData() {




    this.submitted = true;

    // stop here if form is invalid

    if (this.DepartmentDetails.invalid) {

      console.log("Invalid Details");

    }



    //True if all the fields are filled

    if (this.submitted && this.DepartmentDetails.valid) {



     

let reqBody = {
  ...this.DepartmentDetails.value,
  company_id:this.company_id
}
console.log("DepartmentDetails......",reqBody)
      
        this.dashService.DepartmentDetails(reqBody).subscribe(result => {

          
          // this.router.navigate(['/department']);
          if (result) {
            console.log(result);
            console.log(result.message);
  
           
            if(result.message==="Department already exist with this user!")
            {
              this.router.navigate(['department-details']);
              return alert("Department name already exist with this email!");
            
          
          }
          if(result.message==="Department added successfully!")
          {
            this.router.navigate(['department']);
            return alert("Department details added successfully!");
            
          }
        
          }
        });

      







    }


  }


  exit() {
    this.submitData();
    if (confirm("Department Details added successfully")) {
      location.reload();
    }
  }



  //bug fixing

keyPressAlphabet(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-z A-Z]/.test(input)) {
  return true;
  } else {
 event.preventDefault();
  return false;
   }
  }


  getdetail() {
    this.authService.getAllJoiners(this.company_id).subscribe((data: any): void => {
      this.allemployeedata = data;
    
      console.log("getdetail.............", this.allemployeedata);
      
    });
}


getdetailDepartment() {
  console.log(this.company_id);
  
  this.dashService.Department(this.company_id).subscribe((data: any): void => {
    this.alldata = data;

   
    console.log('getPR+++', this.alldata);

   
  });
}

}
