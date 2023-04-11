import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

// import { AuthServiceService } from 'src/app/auth-service.service';




@Component({
  selector: 'app-company-mailing-credentials',
  templateUrl: './company-mailing-credentials.component.html',
  styleUrls: ['./company-mailing-credentials.component.css']
})
export class CompanyMailingCredentialsComponent implements OnInit {

  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  CompanyDetails: any = FormGroup;

  submitted = false;



  constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private router: Router) { }

  //Add user form actions

  get f() { return this.CompanyDetails.controls; }



  ngOnInit(): void {




    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.CompanyDetails = this.formBuilder.group({

    

      companyId: ['', [Validators.required]],

      companyOfficialEmail:  ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      companyName: ['', [Validators.required]],

      password: ['', [Validators.required,Validators.minLength(6)]],

      added_by:this.roll+'-'+this.emp_name

    });

  }



  
  


  submitData() {




    this.submitted = true;

    // stop here if form is invalid

    if (this.CompanyDetails.invalid) {

      console.log("Invalid Details");

    }



    //True if all the fields are filled

    if (this.submitted && this.CompanyDetails.valid) {



      console.log(this.CompanyDetails.value)


        this.dashService.CompanyMailingDetails(this.CompanyDetails.value).subscribe((result:any) => {

          console.log('test-data', result);
         
          if (result.success) {

            console.log(result);

            console.log(result.message,"hiiiii");

          }

          else {

            console.log("successfully registered", result);

            alert("Company Details added successfully")
            this.CompanyDetails.get('companyId').clearValidators(); 
            
            this.CompanyDetails.get('companyName').clearValidators(); 
            
            this.CompanyDetails.get('companyOfficialEmail').clearValidators(); 
            
            this.CompanyDetails.get('password').clearValidators(); 
            this.CompanyDetails.reset();
          }

        });

      







    }


  }


  exit() {
    this.submitData();
    if (confirm("Company Details added successfully")) {
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
  keyPressAlphaNumeric(event:any){
    var input = String.fromCharCode(event.keyCode)
    if (/[a-zA-Z0-9]/.test(input)) {
    return true;
    } else {
   event.preventDefault();
    return false;
     }
    }
}



